# Grounded portfolio assistant — setup

The `/api/portfolio-ai` Pages Function answers hiring questions grounded in the
curated knowledge base (`src/data/portfolio-knowledge/`). Until the secrets below
are configured, the deployed endpoint returns `mode: "fallback"` and the Focus
Matrix AI route answers from the verified scripted summary instead.

## Secrets and variables

| Name | Kind | Purpose |
| --- | --- | --- |
| `OPENAI_API_KEY` | **secret** | Server-side OpenAI access. Never in client code. |
| `OPENAI_VECTOR_STORE_ID` | **secret** | Output of the upload script below. |
| `OPENAI_MODEL` | var (optional) | Defaults to `gpt-5-mini`; change for cost/quality tests. |
| `PAW_FORCE_FALLBACK` | var (optional) | `1` forces scripted fallback without touching secrets. |

## One-time knowledge upload

```sh
node scripts/portfolio-ai/build-docs.mjs          # regenerate approved docs from the KB
OPENAI_API_KEY=sk-... node scripts/portfolio-ai/upload-knowledge.mjs
# prints the vector-store id → use it below
```

Rerun both whenever files in `src/data/portfolio-knowledge/` change.

## Local development

```sh
cp .dev.vars.example .dev.vars                    # fill in values; file is gitignored
npx astro build
npx wrangler pages dev dist --port 8788           # static site + function locally
```

## Cloudflare preview + production

```sh
npx wrangler pages secret put OPENAI_API_KEY --project-name joelryerson-design
npx wrangler pages secret put OPENAI_VECTOR_STORE_ID --project-name joelryerson-design
```

or Dashboard → Pages → joelryerson-design → Settings → Environment variables:
add both secrets (encrypt) plus optional `OPENAI_MODEL`, for **Preview** and
**Production** environments as desired. Redeploy after adding.

Never commit a real key. `.dev.vars` is gitignored; only `.dev.vars.example`
belongs in the repo.

## Evaluation

```sh
EVAL_URL=http://localhost:8788/api/portfolio-ai node scripts/portfolio-ai/eval.mjs
```

Writes `scripts/portfolio-ai/eval-results.json` and prints a pass/fail table.
Against an unconfigured endpoint, grounded categories report
`fallback (pending secrets)`; refusal and injection categories still validate.

## Production-grade rate limiting (not in this prototype)

The function throttles per isolate (in-memory, 20 req/min/IP) and rejects
duplicate request IDs. Real production limits need a durable counter —
Cloudflare KV, a Durable Object, or the Rate Limiting binding — plus WAF rules.
Documented here so the gap is explicit.
