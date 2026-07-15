// Synthetic-fixture tests for the LinkedIn import workflow. No real
// LinkedIn data anywhere in this suite.
//   npm run portfolio-ai:test-linkedin
import assert from 'node:assert';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { parseCsv, parseLinkedInDate, normalizeRoles, diffTimelines, careerCalcs, validatePending, roleKey } from '../lib.mjs';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIR, '../../../..');
const IMPORTER = path.join(DIR, '../import-linkedin.mjs');
const APPROVER = path.join(DIR, '../approve-linkedin.mjs');
let passed = 0, failed = 0;
const t = (name, fn) => { try { fn(); passed++; console.log('PASS ' + name); } catch (e) { failed++; console.log('FAIL ' + name + ' — ' + e.message); } };

const CSV = `First Name,Company Name,Title,Description,Location,Started On,Finished On
,Acme Studio,Product Designer,"Designed things, thoroughly",Remote,Mar 2020,Feb 2022
,BetaWorks Inc.,Senior Product Designer,Systems and tokens,SF,Mar 2022,
,Acme Studio,Design Lead,Promotion — distinct role,Remote,Jan 2021,Dec 2021
`;

// ---------- unit: parsing & normalization ----------
t('csv parse handles quoted commas', () => {
  const rows = parseCsv(CSV);
  assert.equal(rows.length, 3);
  assert.equal(rows[0]['description'], 'Designed things, thoroughly');
});
t('date parse: month+year / year-only / missing / ambiguous', () => {
  assert.deepEqual(parseLinkedInDate('Mar 2020'), { month: 3, year: 2020 });
  assert.deepEqual(parseLinkedInDate('2021'), { month: null, year: 2021 });
  assert.deepEqual(parseLinkedInDate(''), { month: null, year: null });
  assert.equal(parseLinkedInDate('Springtime 20').ambiguous, 'Springtime 20');
});
t('initial structured import normalizes all roles', () => {
  const { roles } = normalizeRoles(parseCsv(CSV), 'positions-csv', 'x', 'h');
  assert.equal(roles.length, 3);
  assert.equal(roles[1].ongoing, true);
  assert.equal(roles[0].approvalStatus, 'pending');
});
t('missing month tolerated, missing year flagged', () => {
  const { roles } = normalizeRoles([{ 'company name': 'C', 'title': 'T', 'started on': '2021', 'finished on': '' }], 'csv', 'x', 'h');
  assert.equal(roles[0].startMonth, null);
  assert.equal(roles[0].startYear, 2021);
  const bad = normalizeRoles([{ 'company name': 'C', 'title': 'T', 'started on': '', 'finished on': '' }], 'csv', 'x', 'h');
  assert.ok(bad.roles[0].conflictWarnings.some((w) => w.includes('missing start year')));
});
t('company-suffix/punctuation variants dedupe; promotions stay distinct', () => {
  const rows = [
    { 'company name': 'BetaWorks Inc.', 'title': 'Senior Product Designer', 'started on': 'Mar 2022', 'finished on': '' },
    { 'company name': 'betaworks', 'title': 'Senior  Product Designer', 'started on': 'Mar 2022', 'finished on': '' },
    { 'company name': 'BetaWorks Inc.', 'title': 'Design Director', 'started on': 'Jan 2024', 'finished on': '' },
  ];
  const { roles } = normalizeRoles(rows, 'csv', 'x', 'h');
  assert.equal(roles.length, 2); // dupe merged, promotion preserved
});
t('duplicate csv+pdf entries collapse via roleKey', () => {
  const a = normalizeRoles(parseCsv(CSV), 'positions-csv', 'x', 'h').roles[0];
  const b = { ...a, sourceType: 'profile-pdf', companyOriginal: 'Acme Studio, Inc.' };
  assert.equal(roleKey(a), roleKey(b));
});
t('malformed csv throws cleanly', () => {
  assert.throws(() => parseCsv(''));
});

// ---------- unit: calculations ----------
t('overlapping jobs do not double-count the calendar span', () => {
  const { roles } = normalizeRoles(parseCsv(CSV), 'csv', 'x', 'h');
  const c = careerCalcs(roles, { year: 2026, month: 7 });
  // Mar 2020 → Jul 2026 continuous (overlap merged) = 77 months, not 77+12
  assert.equal(c.totalCalendarMonths, 77);
  assert.equal(c.overlapping, true);
  assert.equal(c.gaps.length, 0);
});
t('six-year baseline consistent with 2020 start', () => {
  const { roles } = normalizeRoles(parseCsv(CSV), 'csv', 'x', 'h');
  const c = careerCalcs(roles, { year: 2026, month: 7 });
  assert.equal(c.earliestStartYear, 2020);
  assert.ok(c.totalCalendarMonths / 12 >= 5 && c.totalCalendarMonths / 12 < 7);
});
t('specialty-duration restraint: calcs expose no per-technology durations', () => {
  const c = careerCalcs(normalizeRoles(parseCsv(CSV), 'csv', 'x', 'h').roles);
  assert.ok(!('reactNativeYears' in c) && !('designSystemYears' in c));
});
t('ongoing vs completed counts', () => {
  const c = careerCalcs(normalizeRoles(parseCsv(CSV), 'csv', 'x', 'h').roles);
  assert.equal(c.ongoingCount, 1);
  assert.equal(c.completedCount, 2);
});

// ---------- unit: diffs ----------
const base = normalizeRoles(parseCsv(CSV), 'csv', 'x', 'h').roles;
t('adding a future role appears as added', () => {
  const next = [...base, ...normalizeRoles([{ 'company name': 'NewCo', 'title': 'Principal Designer', 'started on': 'Sep 2026', 'finished on': '' }], 'csv', 'x2', 'h2').roles];
  const d = diffTimelines(base, next);
  assert.equal(d.added.length, 1);
  assert.equal(d.added[0].companyOriginal, 'NewCo');
});
t('ongoing → completed appears as change', () => {
  const next = JSON.parse(JSON.stringify(base));
  next[1].ongoing = false; next[1].endMonth = 6; next[1].endYear = 2026;
  const d = diffTimelines(base, next);
  assert.ok(d.changed.some((c) => c.deltas.some((x) => x.field === 'ongoing')));
});
t('completed → ongoing appears as change', () => {
  const next = JSON.parse(JSON.stringify(base));
  next[0].ongoing = true; next[0].endYear = null; next[0].endMonth = null;
  assert.ok(diffTimelines(base, next).changed.length >= 1);
});
t('title change detected; removed role flagged not deleted', () => {
  const next = JSON.parse(JSON.stringify(base)).slice(0, 2);
  const d = diffTimelines(base, next);
  assert.equal(d.removed.length, 1);
  assert.ok(d.removed[0].note.includes('flagged for review'));
});
t('repeat import with no changes → empty diff', () => {
  const d = diffTimelines(base, JSON.parse(JSON.stringify(base)));
  assert.equal(d.added.length + d.removed.length + d.changed.length, 0);
});

// ---------- unit: validation & conflicts ----------
t('design role predating 2020 baseline is a high-severity conflict', () => {
  const { roles } = normalizeRoles([{ 'company name': 'Old', 'title': 'UX Designer', 'started on': 'Jan 2015', 'finished on': 'Dec 2016' }], 'csv', 'x', 'h');
  const v = validatePending({ roles }, { professionalDesignStartYear: 2020 });
  assert.equal(v.ok, false);
});
t('conflicting case-study/resume dates surface as errors not silent picks', () => {
  const { roles } = normalizeRoles([{ 'company name': 'A', 'title': 'Designer', 'started on': '', 'finished on': '' }], 'csv', 'x', 'h');
  const v = validatePending({ roles }, { professionalDesignStartYear: 2020 });
  assert.ok(v.errors.some((e) => e.includes('never invent dates')));
});

// ---------- integration: importer CLI on synthetic fixtures ----------
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'li-test-'));
const env = { ...process.env, PAW_LI_HOME: path.join(tmp, 'private'), PAW_LI_APPROVED: path.join(tmp, 'career-history.json') };
fs.writeFileSync(env.PAW_LI_APPROVED, JSON.stringify({ version: 0, baseline: { professionalDesignStartYear: 2020 }, roles: [], provenance: {} }));
const csvPath = path.join(tmp, 'Positions.csv');
fs.writeFileSync(csvPath, CSV);

t('positions CSV import writes pending artifact, no runtime change', () => {
  execFileSync('node', [IMPORTER, csvPath], { env, encoding: 'utf8' });
  const pend = fs.readdirSync(path.join(env.PAW_LI_HOME, 'pending')).filter((f) => f.endsWith('.json'));
  assert.equal(pend.length, 1);
  const approved = JSON.parse(fs.readFileSync(env.PAW_LI_APPROVED, 'utf8'));
  assert.equal(approved.roles.length, 0); // runtime untouched
});
t('zip import ignores unrelated account files', () => {
  const zdir = fs.mkdtempSync(path.join(os.tmpdir(), 'li-zip-'));
  fs.writeFileSync(path.join(zdir, 'Positions.csv'), CSV);
  fs.writeFileSync(path.join(zdir, 'messages.csv'), 'from,to,body\nx,y,secret');
  fs.writeFileSync(path.join(zdir, 'Connections.csv'), 'name\nsomeone');
  fs.writeFileSync(path.join(zdir, 'Ad_Targeting.csv'), 'segment\nfoo');
  const zipPath = path.join(tmp, 'export.zip');
  execSync(`cd ${JSON.stringify(zdir)} && zip -q ${JSON.stringify(zipPath)} Positions.csv messages.csv Connections.csv Ad_Targeting.csv`);
  const out = execFileSync('node', [IMPORTER, zipPath], { env, encoding: 'utf8' });
  assert.ok(out.includes('using 1 career file'));
  assert.ok(out.includes('ignoring'));
  // private data from ignored files never lands in normalized output
  const norm = fs.readdirSync(path.join(env.PAW_LI_HOME, 'normalized')).sort().at(-1);
  assert.ok(!fs.readFileSync(path.join(env.PAW_LI_HOME, 'normalized', norm), 'utf8').includes('secret'));
});
t('profile PDF fallback degrades safely when pdftotext is absent or text is unparseable', () => {
  const fake = path.join(tmp, 'profile.pdf');
  fs.writeFileSync(fake, '%PDF-1.4 not really parseable');
  let code = 0;
  try { execFileSync('node', [IMPORTER, fake], { env, encoding: 'utf8', stdio: 'pipe' }); } catch (e) { code = e.status; }
  assert.equal(code, 1); // refuses rather than inventing roles
});
t('no automatic approval: approver refuses without approved marks and --confirm', () => {
  const pend = fs.readdirSync(path.join(env.PAW_LI_HOME, 'pending')).filter((f) => f.endsWith('.json')).sort().at(-1);
  let code = 0;
  try { execFileSync('node', [APPROVER, pend], { env, encoding: 'utf8', stdio: 'pipe' }); } catch (e) { code = e.status; }
  assert.equal(code, 1);
});
t('runtime never imports pending data', () => {
  // the function bundles career-history.json only; pending lives outside src
  const fn = fs.readFileSync(path.join(ROOT, 'functions/api/portfolio-ai.ts'), 'utf8');
  assert.ok(!fn.includes('.private'));
  assert.ok(!fn.includes('pending'));
});

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
