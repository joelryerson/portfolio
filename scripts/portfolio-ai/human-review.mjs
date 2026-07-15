// Runs the human-review question set against the endpoint and writes
// human-review-sheet.md with model outputs and EMPTY score columns for a
// human reviewer. The model never scores itself.
//   EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/human-review.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const URL_ = process.env.EVAL_URL || 'http://localhost:8788/api/portfolio-ai';
const { questions } = JSON.parse(fs.readFileSync(path.join(DIR, 'human-review-set.json'), 'utf8'));

const rows = [];
for (const q of questions) {
  const isRole = q.q === 'mode:role_comparison';
  const body = {
    requestId: 'hr-' + q.id + '-' + Date.now(),
    question: isRole ? '' : q.q,
    jobDescription: isRole ? q.jd : '',
    mode: isRole ? 'role_comparison' : 'question',
    project: '', context: [],
  };
  let data, ms = 0;
  for (let attempt = 0; ; attempt++) {
    const t0 = performance.now();
    const res = await fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...body, requestId: body.requestId + '-' + attempt }) });
    if (res.status === 429 && attempt < 5) { await new Promise((r) => setTimeout(r, 16000)); continue; }
    ms = Math.round(performance.now() - t0);
    data = await res.json();
    break;
  }
  rows.push({ id: q.id, question: isRole ? 'ROLE: ' + q.jd.slice(0, 90) + '…' : q.q, data, ms });
  console.log(q.id, data.mode, ms + 'ms');
}

const SCORE_COLS = ['accuracy', 'evidence', 'candor', 'relevance', 'concision', 'usefulness', 'status precision', 'confidence calib.', 'time saved'];
const md = [
  '# Human review sheet — grounded portfolio assistant',
  '',
  'Endpoint: ' + URL_ + ' · ran ' + new Date().toISOString(),
  'Score each answer 1–5 per column. The model has NOT scored itself.',
  '',
  ...rows.flatMap((r) => [
    `## ${r.id} — ${r.question}`,
    '',
    `> mode: ${r.data.mode} · confidence: ${r.data.confidence || '—'} · ${r.ms}ms${r.data.usage ? ` · tokens in/out ${r.data.usage.input}/${r.data.usage.output}` : ''}`,
    '',
    r.data.mode === 'fallback' ? '_(fallback — live model not configured; rerun with secrets)_' : (r.data.answer || '(no answer)'),
    '',
    (r.data.evidence || []).length ? 'Evidence: ' + r.data.evidence.map((e) => `${e.sourceLabel} (${e.url || 'limitation'})`).join(' · ') : 'Evidence: —',
    (r.data.limitations || []).length ? 'Limitations: ' + r.data.limitations.join(' | ') : '',
    '',
    '| ' + SCORE_COLS.join(' | ') + ' | notes |',
    '|' + SCORE_COLS.map(() => '---').join('|') + '|---|',
    '| ' + SCORE_COLS.map(() => ' ').join(' | ') + ' |  |',
    '',
  ]),
].join('\n');
fs.writeFileSync(path.join(DIR, 'human-review-sheet.md'), md);
console.log('\nWrote human-review-sheet.md (' + rows.length + ' answers, unscored)');
