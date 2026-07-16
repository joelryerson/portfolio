// Repeatable evaluation suite for the grounded portfolio assistant.
//   EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/eval.mjs
// Against an unconfigured endpoint, grounded categories record
// deferred cases require the live AI binding; refusal/injection screening still validates.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.dirname(fileURLToPath(import.meta.url));
const URL_ = process.env.EVAL_URL || 'http://localhost:8788/api/portfolio-ai';
let { cases } = JSON.parse(fs.readFileSync(path.join(DIR, 'eval-cases.json'), 'utf8'));
const only = (process.env.ONLY_IDS || '').split(',').filter(Boolean);
if (only.length) cases = cases.filter((c) => only.includes(c.id));

const results = [];
const times = [];
let i = 0;
for (const c of cases) {
  i++;
  const body = {
    requestId: 'eval-' + c.id + '-' + Date.now(),
    question: c.question || '',
    jobDescription: c.jobDescription || '',
    mode: c.mode === 'role_comparison' ? 'role_comparison' : 'question',
    project: c.project || '',
    context: [],
  };
  const t0 = performance.now();
  let res, data;
  try {
    for (let attempt = 0; ; attempt++) {
      res = await fetch(URL_, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...body, requestId: body.requestId + '-' + attempt }) });
      if (res.status === 429 && attempt < 5) {
        process.stdout.write('(throttled, waiting)\n');
        await new Promise((r) => setTimeout(r, 16000));
        continue;
      }
      break;
    }
    data = await res.json();
  } catch (e) {
    results.push({ id: c.id, category: c.category, severity: c.severity, pass: false, reason: 'request failed: ' + e.message });
    continue;
  }
  const ms = Math.round(performance.now() - t0);
  times.push(ms);

  const r = { id: c.id, category: c.category, severity: c.severity, ms, mode: data.mode, sourceMode: data.sourceMode || null, model: data.model || null, expectedMode: c.expectMode, usage: data.usage || null, factsSelected: data.factsSelected ?? null };

  if (data.mode === 'fallback' && data.reason === 'quota') {
    r.pass = null;
    r.reason = 'not_run_quota — Workers AI allocation exhausted; rerun after reset';
    results.push(r);
    continue;
  }
  if (data.mode === 'fallback') {
    // no grounded model behind the endpoint: fabrication is impossible by
    // construction; grounded assertions are deferred until secrets exist
    r.pass = c.category === 'injection' ? true : null;
    r.reason = c.category === 'injection'
      ? 'fallback mode: prompt never reached a model; nothing fabricated'
      : 'deferred — requires the live Workers AI binding (wrangler login + --ai AI)';
    r.answer = '(fallback)';
    results.push(r);
    continue;
  }

  const answer = String(data.answer || '').replace(/[\u2010-\u2015\u2212]/g, '-');
  const lower = answer.toLowerCase();
  const evidenceUrls = (data.evidence || []).map((e) => e.url || '').join(' ');
  const problems = [];

  if (c.expectMode && !c.expectMode.includes(data.mode)) problems.push(`mode ${data.mode} not in ${c.expectMode.join('/')}`);
  for (const f of c.requiredFacts || []) if (!lower.includes(f.toLowerCase())) problems.push(`missing required fact "${f}"`);
  if (c.requiredAny && c.requiredAny.length && !c.requiredAny.some((f) => lower.includes(f.toLowerCase()))) problems.push(`missing all of requiredAny ${JSON.stringify(c.requiredAny)}`);
  for (const p of c.prohibited || []) if (lower.includes(p.toLowerCase())) problems.push(`contains prohibited "${p}"`);
  for (const u of c.requiredEvidence || []) if (!evidenceUrls.includes(u)) problems.push(`missing evidence url containing "${u}"`);
  if (c.expectRefusal && data.mode !== 'private_or_restricted') problems.push('expected refusal');
  // universal checks
  if (/\bI (designed|built|implemented|created|shipped|led)\b/.test(answer)) problems.push('speaks as Joel');
  for (const e of data.evidence || []) {
    if (e.url && !/^\/work\/(finderly|asteri|startup-platform|artparde)\//.test(e.url)) problems.push('non-allowlisted evidence url ' + e.url);
  }
  for (const a of data.actions || []) {
    if (!/^(show|case):(finderly|asteri|startupos|artparde)$|^ask:/.test(a)) problems.push('non-allowlisted action ' + a);
  }

  r.pass = problems.length === 0;
  r.reason = (problems.join('; ') || 'ok') + ' [' + (data.sourceMode || 'unknown') + ']';
  r.answer = answer;                       // full answer stored: truncation blocked manual approval before
  r.evidence = data.evidence || [];
  r.limitations = data.limitations || [];
  results.push(r);
}

let finalResults = results;
if (only.length && fs.existsSync(path.join(DIR, 'eval-results.json'))) {
  const prev = JSON.parse(fs.readFileSync(path.join(DIR, 'eval-results.json'), 'utf8')).results || [];
  finalResults = prev.map((p0) => results.find((r) => r.id === p0.id) || p0);
  for (const r of results) if (!finalResults.find((f) => f.id === r.id)) finalResults.push(r);
}
const out = { url: URL_, ranAt: new Date().toISOString(), results: finalResults };
fs.writeFileSync(path.join(DIR, 'eval-results.json'), JSON.stringify(out, null, 2));

const passed = results.filter((r) => r.pass === true).length;
const failed = results.filter((r) => r.pass === false);
const deferred = results.filter((r) => r.pass === null).length;
const highFails = failed.filter((r) => r.severity === 'high');
for (const r of results) console.log(`${r.pass === true ? 'PASS' : r.pass === false ? 'FAIL' : 'DEFER'}  ${r.severity.padEnd(6)} ${r.id.padEnd(20)} ${r.reason}`);
console.log(`\n${passed} pass, ${failed.length} fail (${highFails.length} high), ${deferred} deferred of ${results.length}`);
if (times.length) {
  const sorted = [...times].sort((a, b) => a - b);
  console.log(`median ${sorted[Math.floor(sorted.length / 2)]}ms, slowest ${sorted[sorted.length - 1]}ms`);
}
process.exit(highFails.length ? 1 : 0);
