// LinkedIn career-history importer. Chronology import source only — never a
// runtime dependency, never scraped, never fetched at question time.
//
//   npm run portfolio-ai:import-linkedin -- <path-to-export>
//
// Accepts: LinkedIn account-data ZIP (preferred) → Positions CSV → profile
// PDF (low-confidence fallback, requires `pdftotext`). Writes a normalized
// snapshot and a pending diff into .private/ (gitignored). NEVER updates
// approved runtime facts — that is approve-linkedin's job, after human review.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseCsv, normalizeRoles, diffTimelines, careerCalcs, sha256, validatePending } from './lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const PRIV = process.env.PAW_LI_HOME || path.join(ROOT, '.private/portfolio-ai/linkedin');
const APPROVED = process.env.PAW_LI_APPROVED || path.join(ROOT, 'src/data/portfolio-knowledge/career-history.json');
const CAREER_FILES = ['Positions.csv', 'Profile.csv', 'Education.csv'];
const IGNORED_HINT = /message|connection|contact|ad_|advert|search|viewer|email|invitation|reaction|share|comment|rich media|saved/i;

const input = process.argv[2];
if (!input || !fs.existsSync(input)) {
  console.error('Usage: npm run portfolio-ai:import-linkedin -- <export.zip | Positions.csv | Profile.pdf>');
  process.exit(1);
}
for (const d of ['raw', 'normalized', 'pending']) fs.mkdirSync(path.join(PRIV, d), { recursive: true });

const buf = fs.readFileSync(input);
const hash = sha256(buf);
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const ext = path.extname(input).toLowerCase();
let rows = [], sourceType = '', lowConfidence = false;

if (ext === '.zip') {
  sourceType = 'linkedin-zip';
  const listing = execFileSync('unzip', ['-Z1', input], { encoding: 'utf8' }).split('\n').filter(Boolean);
  const careerEntries = listing.filter((f) => CAREER_FILES.includes(path.basename(f)));
  const ignored = listing.filter((f) => IGNORED_HINT.test(f)).length;
  console.log(`ZIP: ${listing.length} entries; using ${careerEntries.length} career file(s); ignoring ${ignored} non-career file(s) (messages, connections, ads, etc.)`);
  const positions = careerEntries.find((f) => path.basename(f) === 'Positions.csv');
  if (!positions) { console.error('No Positions.csv found in the export ZIP.'); process.exit(1); }
  rows = parseCsv(execFileSync('unzip', ['-p', input, positions], { encoding: 'utf8' }));
  // raw archive stays where Joel put it; only the career CSV is snapshotted privately
  fs.writeFileSync(path.join(PRIV, 'raw', `positions-${stamp}.csv`), execFileSync('unzip', ['-p', input, positions], { encoding: 'utf8' }));
} else if (ext === '.csv') {
  sourceType = 'positions-csv';
  rows = parseCsv(buf.toString('utf8'));
  fs.copyFileSync(input, path.join(PRIV, 'raw', `positions-${stamp}.csv`));
} else if (ext === '.pdf') {
  sourceType = 'profile-pdf';
  lowConfidence = true;
  let text = '';
  try { text = execFileSync('pdftotext', [input, '-'], { encoding: 'utf8' }); }
  catch { console.error('PDF fallback needs `pdftotext` (poppler). Prefer the ZIP or Positions.csv export.'); process.exit(1); }
  // conservative extraction: "Title\nCompany\nMon YYYY - Mon YYYY|Present" blocks
  const re = /^(.{3,80})\n(.{2,80})\n([A-Z][a-z]{2} \d{4})\s*[-–]\s*(Present|[A-Z][a-z]{2} \d{4})/gm;
  let m;
  while ((m = re.exec(text))) {
    rows.push({ 'title': m[1], 'company name': m[2], 'started on': m[3], 'finished on': m[4] === 'Present' ? '' : m[4] });
  }
  if (!rows.length) { console.error('Could not confidently extract roles from the PDF; flagging for manual entry. Nothing written.'); process.exit(1); }
  console.log('PDF parse is low-confidence: every extracted role is flagged for manual review.');
  fs.copyFileSync(input, path.join(PRIV, 'raw', `profile-${stamp}.pdf`));
} else {
  console.error('Unsupported file type: ' + ext);
  process.exit(1);
}

const { roles, warnings } = normalizeRoles(rows, sourceType, stamp, hash);
if (lowConfidence) for (const r of roles) r.conflictWarnings.push('low-confidence PDF extraction — verify all fields');

const approved = JSON.parse(fs.readFileSync(APPROVED, 'utf8'));
const prevNorm = fs.readdirSync(path.join(PRIV, 'normalized')).sort().at(-1);
const prev = prevNorm ? JSON.parse(fs.readFileSync(path.join(PRIV, 'normalized', prevNorm), 'utf8')) : null;

const normalized = { version: (prev?.version || 0) + 1, sourceType, sourceHash: hash, sourceExportDate: stamp, roles };
fs.writeFileSync(path.join(PRIV, 'normalized', `timeline-${stamp}.json`), JSON.stringify(normalized, null, 2));

const diffApproved = diffTimelines(approved.roles || [], roles);
const diffPrev = prev ? diffTimelines(prev.roles || [], roles) : null;
const calcs = careerCalcs(roles);
const validation = validatePending({ roles }, approved.baseline);

// baseline consistency check (verify/enrich/flag — never auto-block the approved 2020 fact)
const baselineNotes = [];
if (calcs.earliestStartYear && calcs.earliestStartYear !== approved.baseline.professionalDesignStartYear) {
  baselineNotes.push(`Import's earliest role starts ${calcs.earliestStartYear}; approved design baseline is ${approved.baseline.professionalDesignStartYear}. Flagged for review — the approved baseline stands until Joel resolves this.`);
}

const pending = {
  createdAt: new Date().toISOString(), sourceType, sourceHash: hash,
  roles, diffAgainstApproved: diffApproved, diffAgainstPreviousImport: diffPrev,
  calcs, validation, baselineNotes,
};
const pendingPath = path.join(PRIV, 'pending', `pending-${stamp}.json`);
fs.writeFileSync(pendingPath, JSON.stringify(pending, null, 2));

const md = [
  `# LinkedIn import diff — ${stamp} (${sourceType})`, '',
  `Roles imported: ${roles.length} · warnings: ${warnings.length} · schema: ${validation.ok ? 'clean' : 'ERRORS'}`,
  '', '## Added roles', ...(diffApproved.added.map((r) => `- ${r.titleOriginal} @ ${r.companyOriginal} (${r.startYear ?? '?'}${r.ongoing ? '–ongoing' : r.endYear ? '–' + r.endYear : ''})`) || []),
  '', '## Removed vs approved (flagged, not deleted)', ...diffApproved.removed.map((r) => `- ${r.titleOriginal} @ ${r.companyOriginal}`),
  '', '## Changed', ...diffApproved.changed.map((c) => `- ${c.key}: ` + c.deltas.map((d) => `${d.field} ${JSON.stringify(d.from)}→${JSON.stringify(d.to)}`).join(', ')),
  '', '## Validation', ...validation.errors.map((e) => `- ERROR: ${e}`), ...validation.warnings.map((w) => `- warn: ${w}`),
  '', '## Baseline', ...(baselineNotes.length ? baselineNotes : ['Consistent with the approved 2020 baseline (or no dated roles to compare).']),
  '', `Total calendar span (overlap-merged): ${calcs.totalCalendarMonths} months · ongoing: ${calcs.ongoingCount} · completed: ${calcs.completedCount} · gaps: ${calcs.gaps.length}`,
  '', 'Nothing has been approved or published. Review this diff, set proposedPublicSummary / titlePublic on roles you approve, then run:',
  '  npm run portfolio-ai:approve-linkedin -- ' + path.basename(pendingPath) + ' --confirm',
].join('\n');
fs.writeFileSync(pendingPath.replace('.json', '.md'), md);
console.log(md);
console.log('\nPending artifact: ' + pendingPath + ' (private, gitignored, not used by the runtime)');
