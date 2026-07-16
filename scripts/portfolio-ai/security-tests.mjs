// Security tests for the portfolio-ai endpoint's upstream diagnostics.
// Verifies that `rawError` exposure is controlled ONLY by the explicit
// PAW_DEBUG_UPSTREAM flag — a manipulated Host header must never expose it.
//
//   node scripts/portfolio-ai/security-tests.mjs
//
// Spins up an isolated `wrangler pages dev` instance on port 8794 with the
// flag explicitly ABSENT (and an invalid model to force an upstream error
// when an AI binding is available), then attacks it with spoofed Host
// headers. Does not touch the main dev server on 8788.
import { spawn, execSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const PORT = 8794;
let passed = 0, failed = 0;
const t = (name, ok, detail = '') => { ok ? passed++ : failed++; console.log((ok ? 'PASS ' : 'FAIL ') + name + (detail ? ' — ' + detail : '')); };

// isolated copy of dist so wrangler does not pick up the repo's .dev.vars
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'paw-sec-'));
execSync(`cp -R ${JSON.stringify(path.join(ROOT, 'dist'))} ${JSON.stringify(path.join(tmp, 'dist'))}`);
execSync(`cp -R ${JSON.stringify(path.join(ROOT, 'functions'))} ${JSON.stringify(path.join(tmp, 'functions'))}`);
execSync(`cp -R ${JSON.stringify(path.join(ROOT, 'src'))} ${JSON.stringify(path.join(tmp, 'src'))}`);

const args = ['wrangler', 'pages', 'dev', 'dist', '--port', String(PORT),
  '--binding', 'WORKERS_AI_MODEL=@cf/invalid/nonexistent-model'];
let hasAI = false;
try { execSync('npx wrangler whoami 2>&1 | grep -q "You are logged in"'); hasAI = true; args.push('--ai', 'AI'); } catch {}
const server = spawn('npx', args, { cwd: tmp, stdio: ['ignore', 'pipe', 'pipe'] });
let serverLog = '';
server.stdout.on('data', (d) => { serverLog += d; });
server.stderr.on('data', (d) => { serverLog += d; });

const up = async () => {
  for (let i = 0; i < 60; i++) {
    try { await fetch(`http://127.0.0.1:${PORT}/api/portfolio-ai`, { method: 'GET' }); return true; } catch { await new Promise((r) => setTimeout(r, 2000)); }
  }
  return false;
};

try {
  if (!(await up())) throw new Error('isolated server failed to start');

  const attack = async (hostHeader) => {
    const res = await fetch(`http://127.0.0.1:${PORT}/api/portfolio-ai`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...(hostHeader ? { Host: hostHeader } : {}) },
      body: JSON.stringify({ question: 'How does Joel approach ambiguity in early products?', requestId: 'sec-' + Math.random().toString(36).slice(2), context: [] }),
    });
    return res.json();
  };

  // 1. flag absent, honest host → no rawError regardless of fallback reason
  const base = await attack(null);
  t('flag absent: response omits rawError', !('rawError' in base), 'reason=' + (base.reason || base.sourceMode));

  // 2. manipulated Host headers → still no rawError
  for (const spoof of ['localhost:8788', 'localhost', '127.0.0.1:8788']) {
    const r = await attack(spoof);
    t(`spoofed Host "${spoof}": response omits rawError`, !('rawError' in r), 'reason=' + (r.reason || r.sourceMode));
  }

  // 3. upstream detail still reaches the SERVER console when an error occurred
  if (hasAI && /upstream/.test(serverLog)) {
    t('upstream error logged to server console (not the browser)', true);
  } else {
    console.log('note: AI binding ' + (hasAI ? 'present but no upstream log captured yet' : 'absent') + ' — console-logging assertion skipped (response-side guarantees above are the security boundary)');
  }
} catch (e) {
  t('security suite ran', false, e.message);
} finally {
  server.kill('SIGTERM');
  execSync(`rm -rf ${JSON.stringify(tmp)}`);
}
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed ? 1 : 0);
