// Renders the approved searchable documents for the vector store from the
// curated knowledge base. Rerun whenever the knowledge JSON changes:
//   node scripts/portfolio-ai/build-docs.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const KB = path.join(ROOT, 'src/data/portfolio-knowledge');
const DOCS = path.join(KB, 'docs');
const J = (f) => JSON.parse(fs.readFileSync(path.join(KB, f), 'utf8'));

const profile = J('profile.json');
const career = J('career.json');
const skills = J('skills.json');
const evidence = J('evidence.json');
const projects = ['finderly', 'asteri', 'startupos', 'artparde'].map((p) => J(p + '.json'));

fs.mkdirSync(DOCS, { recursive: true });

const factBlock = (f) => {
  const lines = [
    `### ${f.statement}`,
    `- Status: ${f.status}${f.dateRange ? ` (${f.dateRange})` : ''}`,
    `- Category: ${f.category}`,
    f.sourcePath ? `- Evidence: ${f.sourceLabel} — ${f.sourcePath}${f.sourceAnchor || ''}` : `- Evidence: ${f.sourceLabel}`,
  ];
  if (f.skills?.length) lines.push(`- Skills: ${f.skills.join(', ')}`);
  if (f.limitations?.length) lines.push(`- Limitation: ${f.limitations.join(' ')}`);
  return lines.join('\n');
};

for (const proj of projects) {
  const facts = proj.facts.filter((f) => f.visibility === 'public');
  const eng = career.engagements.find((e) => e.project === proj.project);
  const md = [
    `# ${proj.name} — approved public facts`,
    ``,
    `Role: ${eng.role}. Dates: ${eng.dateRange}. Organization: ${eng.org}.`,
    `Summary: ${eng.summary}`,
    ``,
    `Status vocabulary: shipped and implemented mean the work went live; proposed, in_progress,`,
    `and under_review mean it did NOT fully ship and must never be described as shipped;`,
    `historical marks dated work; not_publicly_verifiable marks stated public limitations.`,
    ``,
    ...facts.map(factBlock),
  ].join('\n\n');
  fs.writeFileSync(path.join(DOCS, `${proj.project}.md`), md);
  console.log('docs/' + proj.project + '.md');
}

const careerMd = [
  `# Joel Ryerson — career and profile (approved public facts)`,
  ``,
  `Name: ${profile.name}. Title: ${profile.title} (displayed as ${profile.displayTitle}). Location: ${profile.location}.`,
  `Positioning: ${profile.positioning}`,
  ``,
  `## Engagements`,
  ...career.engagements.map((e) => `- ${e.dateRange} — ${e.org} — ${e.role}: ${e.summary} Evidence: /work/${e.project === 'startupos' ? 'startup-platform' : e.project}/`),
  ``,
  ...(career.pathNote.visibility === 'public'
    ? [`## Path`, career.pathNote.statement, `Limitation: ${career.pathNote.limitations.join(' ')}`, ``]
    : []),
  `## Skills`,
  ...Object.entries(skills.groups).map(([k, g]) => `- ${k}: ${g.skills.join(', ')} (projects: ${g.projects.join(', ')})`),
].join('\n');
fs.writeFileSync(path.join(DOCS, 'career.md'), careerMd);
console.log('docs/career.md');

const limitsMd = [
  `# Public-evidence limitations (approved statements)`,
  ``,
  `- Asteri: public imagery is abstracted (diagrams and neutralized artifacts, no product screenshots) due to client constraints.`,
  `- Asteri: production reach within the engagement was the pilot dashboard surfaces; the broader rollout was continued by engineering after Joel left; the homepage migration remained under review when the engagement ended.`,
  `- StartupOS: dates to 2022; the date and title are reconstructed from salvaged materials pending Joel's final verification.`,
  `- Finderly: public outcome metrics (usage, conversion, retention) are not part of the case study.`,
  `- People management: no public evidence documents formal people-management experience.`,
  `- Public outcome metrics are limited across projects; the case studies favor verifiable decisions over unverifiable numbers.`,
].join('\n');
fs.writeFileSync(path.join(DOCS, 'limitations.md'), limitsMd);
console.log('docs/limitations.md');
console.log('done');
