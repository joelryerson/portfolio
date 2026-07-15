# Grounded portfolio assistant — setup (Workers AI edition)

The `/api/portfolio-ai` Pages Function answers hiring questions using the
curated knowledge base (`src/data/portfolio-knowledge/`) with **Cloudflare
Workers AI** — no external API key and no vector store. Retrieval is
deterministic over the approved facts; the model only synthesizes.

Hybrid routing: restricted topics and canonical questions are answered
deterministically server-side; only open-ended questions, cross-project
synthesis, and job-description comparisons invoke the model. Every response
carries `sourceMode: deterministic | workers_ai | fallback`.

## Configuration

| Name | Kind | Purpose |
| --- | --- | --- |
| `AI` | binding | Workers AI binding (Pages → Settings → Functions → AI, or wrangler config). |
| `WORKERS_AI_MODEL` | var (optional) | Defaults to `@cf/openai/gpt-oss-20b`. One place to change for quality/usage testing. |
| `PAW_FORCE_FALLBACK` | var (optional) | `1`/`true` disables all inference (deterministic + scripted fallback only). |

## Local development

```sh
npx wrangler login                       # one-time; requires Joel (browser auth)
npx astro build
npx wrangler pages dev dist --ai AI      # static site + function + local AI binding
```

Without `wrangler login`, run `npx wrangler pages dev dist` (no `--ai`): the
endpoint serves deterministic answers and verified fallback; no inference.
Local `--ai` inference proxies to your Cloudflare account and counts against
the Workers AI free allocation.

## Enabling on Cloudflare Preview/Production (manual, Joel only)

Dashboard → Pages → joelryerson-design → Settings → Functions → **AI binding**
→ add binding named `AI` for the chosen environment, then redeploy. Do not do
this until the preview-readiness gate passes.

## Evaluation

```sh
EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/eval.mjs
EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/human-review.mjs
```

`eval.mjs` records `sourceMode` per case: a case only counts as a live pass
when `sourceMode` is `workers_ai`; quota exhaustion marks cases
`not_run_quota` (not failed). Usage: the Workers AI dashboard (Cloudflare →
AI → Workers AI) shows neuron consumption; the response includes a `usage`
field only when the runtime provides one.

## Archived OpenAI implementation (inactive)

`scripts/portfolio-ai/archive/` holds the previous OpenAI Responses +
File Search endpoint and the vector-store uploader as `.txt` history. They
are not imported, not routed, and require no configuration. `.dev.vars` /
OpenAI secrets are no longer needed by anything active.

## Production-grade controls still required before public exposure

Turnstile (or equivalent) bot protection; a Cloudflare-backed global rate
limit (KV/Durable Object/rate-limit binding) instead of per-isolate memory;
a maximum daily inference budget with deterministic fallback after it.
