// Applies a reviewed pending LinkedIn import to the approved career dataset.
//   npm run portfolio-ai:approve-linkedin -- pending-<ts>.json --confirm
//
// Refuses without --confirm, on schema errors, or on unresolved high-severity
// date conflicts. Only roles whose approvalStatus was set to "approved" in the
// pending file become public; descriptions publish only via proposedPublicSummary.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { validatePending } from './lib.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const PRIV = process.env.PAW_LI_HOME || path.join(ROOT, '.private/portfolio-ai/linkedin');
const APPROVED = process.env.PAW_LI_APPROVED || path.join(ROOT, 'src/data/portfolio-knowledge/career-history.json');
const CONFLICTS = path.join(ROOT, 'src/data/portfolio-knowledge/conflict-report.md');

const args = process.argv.slice(2).filter((a) => a !== '--');
const name = args.find((a) => !a.startsWith('--'));
const confirmed = args.includes('--confirm');
if (!name) { console.error('Usage: npm run portfolio-ai:approve-linkedin -- <pending-file.json> --confirm'); process.exit(1); }
const pendingPath = path.isAbsolute(name) ? name : path.join(PRIV, 'pending', name);
if (!fs.existsSync(pendingPath)) { console.error('Pending file not found: ' + pendingPath); process.exit(1); }
const pending = JSON.parse(fs.readFileSync(pendingPath, 'utf8'));
const approved = JSON.parse(fs.readFileSync(APPROVED, 'utf8'));

const validation = validatePending(pending, approved.baseline);
if (!validation.ok) {
  console.error('Schema validation failed — resolve before approval:');
  for (const e of validation.errors) console.error('  ' + e);
  process.exit(1);
}
const toApprove = (pending.roles || []).filter((r) => r.approvalStatus === 'approved');
const skipped = (pending.roles || []).filter((r) => r.approvalStatus !== 'approved');
if (!toApprove.length) {
  console.error('No roles are marked approvalStatus:"approved" in the pending file. Mark the roles you reviewed (and set titlePublic / proposedPublicSummary for anything that should be public), then rerun.');
  process.exit(1);
}
if (!confirmed) {
  console.error(`--confirm missing. This would publish ${toApprove.length} role(s) and skip ${skipped.length}. Review the .md diff, then rerun with --confirm.`);
  process.exit(1);
}
const highSeverity = toApprove.flatMap((r) => (r.conflictWarnings || []).filter((w) => /missing start year|conflicts with approved/.test(w)).map((w) => `${r.sourceId}: ${w}`));
if (highSeverity.length) {
  console.error('Unresolved high-severity conflicts on approved roles:');
  for (const w of highSeverity) console.error('  ' + w);
  process.exit(1);
}

const now = new Date().toISOString();
approved.roles = toApprove.map((r) => ({
  ...r,
  descriptionOriginal: undefined,                    // originals never publish
  publicSummary: r.proposedPublicSummary || null,
  approvalStatus: 'approved', approvedAt: now,
}));
approved.version = (approved.version || 0) + 1;
approved.provenance = {
  lastImportedAt: pending.createdAt, lastApprovedAt: now,
  sourceExportDate: pending.roles[0]?.sourceExportDate || null,
  sourceHash: pending.sourceHash, approvalVersion: (approved.provenance?.approvalVersion || 0) + 1,
};
fs.writeFileSync(APPROVED, JSON.stringify(approved, null, 2));

fs.appendFileSync(CONFLICTS, `\n\n## LinkedIn approval ${now}\n- Approved ${toApprove.length} role(s), skipped ${skipped.length}; source hash ${pending.sourceHash.slice(0, 12)}…\n${pending.baselineNotes?.map((n) => '- ' + n).join('\n') || '- No baseline conflicts.'}\n`);

console.log('Regenerating public knowledge documents…');
execFileSync('node', [path.join(ROOT, 'scripts/portfolio-ai/build-docs.mjs')], { stdio: 'inherit' });
console.log('Running deterministic career tests…');
execFileSync('node', [path.join(ROOT, 'scripts/portfolio-ai/linkedin/tests/run-tests.mjs')], { stdio: 'inherit' });

console.log(`\nApproved: ${toApprove.length} role(s) are now in career-history.json (v${approved.version}).`);
console.log('Became public:');
for (const r of approved.roles) console.log(`  - ${r.titlePublic || r.titleOriginal} @ ${r.companyPublic} (${r.startYear ?? '?'}${r.ongoing ? '–ongoing' : r.endYear ? '–' + r.endYear : ''})${r.publicSummary ? ' + approved summary' : ' (no description published)'}`);
console.log(`Skipped (still pending/private): ${skipped.length}`);
console.log('If the local AI binding is running, rerun role-comparison evals: ONLY_IDS=role-senior-pd,role-de,role-manager EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/eval.mjs');
