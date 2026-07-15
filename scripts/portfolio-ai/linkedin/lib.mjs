// LinkedIn career-history import library: CSV parsing, normalization,
// dedup, diffing against the approved timeline, and career calculations.
// Pure functions — no network, no LinkedIn scraping, no runtime coupling.
import crypto from 'node:crypto';

export const MONTHS = { jan: 1, feb: 2, mar: 3, apr: 4, may: 5, jun: 6, jul: 7, aug: 8, sep: 9, oct: 10, nov: 11, dec: 12 };

export const parseCsv = (text) => {
  const rows = [];
  let row = [], cell = '', inQ = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQ) {
      if (ch === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') inQ = false;
      else cell += ch;
    } else if (ch === '"') inQ = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n' || ch === '\r') {
      if (ch === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); cell = '';
      if (row.some((c) => c.trim() !== '')) rows.push(row);
      row = [];
    } else cell += ch;
  }
  if (cell !== '' || row.length) { row.push(cell); if (row.some((c) => c.trim() !== '')) rows.push(row); }
  if (!rows.length) throw new Error('CSV contained no rows');
  const header = rows[0].map((hd) => hd.trim().toLowerCase().replace(/\s+/g, ' '));
  return rows.slice(1).map((r) => Object.fromEntries(header.map((hd, i) => [hd, (r[i] ?? '').trim()])));
};

// "Mar 2022" | "2022" | "" → {month, year} with nulls, never invented
export const parseLinkedInDate = (s) => {
  const t = String(s || '').trim();
  if (!t) return { month: null, year: null };
  const m = t.match(/^([A-Za-z]{3,9})\s+(\d{4})$/);
  if (m) return { month: MONTHS[m[1].slice(0, 3).toLowerCase()] ?? null, year: +m[2] };
  const y = t.match(/^(\d{4})$/);
  if (y) return { month: null, year: +y[1] };
  return { month: null, year: null, ambiguous: t };
};

const clean = (s) => String(s || '').trim();
const canonCompany = (s) => clean(s).toLowerCase()
  .replace(/[.,]/g, '')
  .replace(/\b(inc|llc|ltd|corp|corporation|co|gmbh)\b/g, '')
  .replace(/\s+/g, ' ').trim();
const canonTitle = (s) => clean(s).toLowerCase().replace(/[.,]/g, '').replace(/\s+/g, ' ').trim();

export const roleKey = (r) => `${canonCompany(r.companyOriginal)}|${canonTitle(r.titleOriginal)}|${r.startYear ?? '?'}-${r.startMonth ?? '?'}`;

// rows: array of objects from Positions.csv-style input (or pdf extraction)
export const normalizeRoles = (rows, sourceType, exportDate, sourceHash) => {
  const roles = [];
  const warnings = [];
  for (const row of rows) {
    const company = clean(row['company name'] || row['company'] || '');
    const title = clean(row['title'] || row['position'] || '');
    if (!company && !title) continue;
    const started = parseLinkedInDate(row['started on'] || row['start date'] || row['from'] || '');
    const finished = parseLinkedInDate(row['finished on'] || row['end date'] || row['to'] || '');
    const ongoing = !clean(row['finished on'] || row['end date'] || row['to'] || '');
    const role = {
      sourceId: 'li-' + crypto.createHash('sha1').update(`${company}|${title}|${row['started on'] || ''}`).digest('hex').slice(0, 10),
      sourceType,
      companyOriginal: company,
      companyPublic: company,           // until approved otherwise
      titleOriginal: title,
      titlePublic: null,                // approved wording assigned at approval time
      employmentType: clean(row['employment type'] || '') || null,
      startMonth: started.month, startYear: started.year,
      endMonth: ongoing ? null : finished.month, endYear: ongoing ? null : finished.year,
      ongoing,
      location: clean(row['location'] || '') || null,
      descriptionOriginal: clean(row['description'] || '') || null,
      proposedPublicSummary: null,      // human writes this during approval
      roleCategories: [], skills: [],
      sourceProfileUrl: clean(row['profile url'] || '') || null,
      sourceExportDate: exportDate,
      importedAt: new Date().toISOString(),
      approvalStatus: 'pending',
      conflictWarnings: [],
      sourceHash,
    };
    if (role.startYear == null) { role.conflictWarnings.push('missing start year'); warnings.push(`${company} / ${title}: missing start year`); }
    if (started.ambiguous) { role.conflictWarnings.push('ambiguous start date: ' + started.ambiguous); warnings.push(`${company}: ambiguous date "${started.ambiguous}"`); }
    if (!ongoing && finished.year == null) { role.conflictWarnings.push('missing end year'); }
    roles.push(role);
  }
  // dedupe across variants (punctuation, suffixes, capitalization, csv+pdf overlap)
  const seen = new Map();
  const deduped = [];
  for (const r of roles) {
    const k = roleKey(r);
    if (seen.has(k)) {
      const prior = seen.get(k);
      // keep the richer record; never silently merge distinct promotions
      if ((r.descriptionOriginal || '').length > (prior.descriptionOriginal || '').length) Object.assign(prior, { descriptionOriginal: r.descriptionOriginal });
      prior.conflictWarnings.push('duplicate candidate merged from ' + r.sourceType);
      continue;
    }
    seen.set(k, r); deduped.push(r);
  }
  return { roles: deduped, warnings };
};

// ---------- career calculations (calendar span, no double counting) ----------
const toIndex = (y, m) => y * 12 + ((m ?? 1) - 1);
export const careerCalcs = (roles, now = { year: 2026, month: 7 }) => {
  const dated = roles.filter((r) => r.startYear != null);
  const intervals = dated.map((r) => [
    toIndex(r.startYear, r.startMonth),
    r.ongoing ? toIndex(now.year, now.month) : toIndex(r.endYear ?? r.startYear, r.endMonth ?? 12),
  ]).sort((a, b) => a[0] - b[0]);
  // merge overlaps so the span never double-counts concurrent roles
  const merged = [];
  for (const iv of intervals) {
    const last = merged[merged.length - 1];
    if (last && iv[0] <= last[1]) last[1] = Math.max(last[1], iv[1]);
    else merged.push([...iv]);
  }
  const totalMonths = merged.reduce((s, [a, b]) => s + (b - a + 1), 0);
  const gaps = [];
  for (let i = 1; i < merged.length; i++) {
    const gap = merged[i][0] - merged[i - 1][1] - 1;
    if (gap > 0) gaps.push({ months: gap, afterIndex: merged[i - 1][1] });
  }
  return {
    earliestStartYear: dated.length ? Math.min(...dated.map((r) => r.startYear)) : null,
    latestDate: dated.length ? Math.max(...intervals.map((iv) => iv[1])) : null,
    totalCalendarMonths: totalMonths,
    roleDurations: dated.map((r) => ({ sourceId: r.sourceId, months: (r.ongoing ? toIndex(now.year, now.month) : toIndex(r.endYear ?? r.startYear, r.endMonth ?? 12)) - toIndex(r.startYear, r.startMonth) + 1 })),
    overlapping: intervals.length > merged.length,
    ongoingCount: roles.filter((r) => r.ongoing).length,
    completedCount: roles.filter((r) => !r.ongoing && r.startYear != null).length,
    gaps,
  };
};

// ---------- diff against the approved timeline ----------
export const diffTimelines = (approvedRoles, importedRoles) => {
  const A = new Map(approvedRoles.map((r) => [roleKey(r), r]));
  const B = new Map(importedRoles.map((r) => [roleKey(r), r]));
  const added = [...B.keys()].filter((k) => !A.has(k)).map((k) => B.get(k));
  const removed = [...A.keys()].filter((k) => !B.has(k)).map((k) => A.get(k));
  const changed = [];
  for (const [k, b] of B) {
    const a = A.get(k);
    if (!a) continue;
    const deltas = [];
    for (const field of ['titleOriginal', 'companyOriginal', 'startMonth', 'startYear', 'endMonth', 'endYear', 'ongoing', 'descriptionOriginal']) {
      if ((a[field] ?? null) !== (b[field] ?? null)) deltas.push({ field, from: a[field] ?? null, to: b[field] ?? null });
    }
    if (deltas.length) changed.push({ key: k, deltas });
  }
  // removed roles are flagged, never auto-deleted from public facts
  return { added, removed: removed.map((r) => ({ ...r, note: 'flagged for review — removal from LinkedIn does not delete approved facts' })), changed };
};

// ---------- validation before approval ----------
export const validatePending = (pending, baseline) => {
  const errors = [];
  const warnings = [];
  for (const r of pending.roles || []) {
    if (!r.companyOriginal || !r.titleOriginal) errors.push(`${r.sourceId}: missing company or title`);
    if (r.startYear == null) errors.push(`${r.sourceId}: missing start year (never invent dates)`);
    if (r.startYear != null && baseline?.professionalDesignStartYear && r.startYear < baseline.professionalDesignStartYear - 1 && /design/i.test(r.titleOriginal || '')) {
      errors.push(`${r.sourceId}: design role starting ${r.startYear} conflicts with approved ${baseline.professionalDesignStartYear} baseline — resolve before approval`);
    }
    if (r.approvalStatus === 'pending' && !r.proposedPublicSummary && r.descriptionOriginal) {
      warnings.push(`${r.sourceId}: original description present but no approved public summary — description stays private`);
    }
  }
  return { ok: errors.length === 0, errors, warnings };
};

export const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');
