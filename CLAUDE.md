# Portfolio Rebuild — joelryerson.design v3

## Mission
Build Joel's portfolio from scratch as a custom-coded site, replacing the Webflow site entirely. Decision is made: full rebuild, nothing sacred from the old site. Target: the strongest possible Design Engineer positioning for the July 2026 market. Do not relitigate the rebuild decision or pad plans with caution about scope.

## Positioning
- **THE ANCHOR IS JOEL, THE PERSON (decided 2026-07-12; supersedes anything below that conflicts).** The site sells his judgment, character, instincts, empathy, standards, and singular path (caregiver → EMT → barista → BDR → design engineer). Design and coding skill are presented as the byproduct of who he is. Character is SHOWN through voice, story, structure, and decisions — never listed as traits. Raw material: content/raw/joel.md (LOCAL-ONLY; contains sensitive items with public scope TBD).
- Title: **Design Engineer** (not Senior Product Designer)
- Specialty: AI-native product design + design engineering — design systems, token pipelines, agentic/AI-assisted build workflows, enterprise SaaS
- The site itself is Exhibit A: custom-built, public repo, real token system. **AI is a tool he directs, mentioned inside How I Build — never the flag.** Leading with AI is explicitly rejected: everyone codes with AI in 2026; it reads as leaning on AI rather than being the talent.

## 2026 Market Research (drives all decisions)
- **~78% of recruiters run AI-assisted screening before a human visits.** Site must be semantic HTML, real text (never text-in-images), structured data, keyword-legible. Machines read it first.
- **Humans give the homepage 10–15 seconds.** First screen must communicate role + seniority + specialty in under 5 seconds. Meaning before branding.
- **Impact > process.** Outcomes and metrics with context beat methodology walkthroughs. Visuals are the entry fee, not the differentiator.
- **Seniority = decision narratives.** 500–800 word case studies tracing one decision: constraints → first attempt → what failed → pivot → tradeoffs → outcome. Kill the exhaustive long-scroll format.
- **AI signals are screened for.** "No AI signals" is a named red flag. Show the AI stack (Claude, Claude Code, Codex, Figma MCP) and how it accelerates work, with human judgment visible. Avoid AI sameness — generic AI-written case studies are a tell.
- **Specificity beats range.** Depth in AI-native enterprise design + design engineering. Don't present as a generalist.
- **Recency.** Work dated 2022 actively hurts in 2026. Lead with 2025–2026 work.
- **3–5 deep projects max.** Quality over quantity.
- **Craft creates memory, but never at usability's expense.** Distinctive interaction/personality; fast load, mobile-first, keyboard-navigable. Broken a11y on a portfolio claiming a11y skills = credibility failure.

## Site Architecture
- **Home** (message spine approved 2026-07-12 after joint red-pen passes; prototype at the session artifact): buyer-first "review document" structure. Sections are the reader's own questions: 01 Will this hold up if I dig (work ledger, each entry = constraint + what I got wrong + outcome) · 02 Can he actually build (site-as-proof + honest AI disclosure + Gabrielle's falsifiable quote) · 03 What's he like to work with (reference-call policy, NO pasted praise) · 04 Where I might not fit (real limitations: solo-operator profile, AI-workflow environments, early candor with honest epistemics) · close (soft consultative ask). Voice: humble confidence, zero puffery, no claim that digging weakens. Week-six fact appears exactly once. LAUNCH-BLOCKING dependencies created by this copy: a substantive How I Build page, and a colophon page with real Lighthouse scores updated per deploy. PENDING JOEL: verify Asteri CEO identity/pronoun; confirm Julia would take reference calls; decide whether clients are named; confirm Finderly cleanup attribution ("led the cleanup"). NOTE 2026-07-12: Joel corrected the Asteri timeline (first pass ADDED a token layer; consolidation by week six; homepage migration still under review then) — the /work/asteri/ case study needs a precision pass against this before launch; its "shipped to production" claims must be re-verified with Joel.
- **Work** (/work/[slug]): decision-narrative case studies (500–800 words) + optional "deep dive" expansion for detail. Live artifacts/demos embedded where possible.
- **How I Build** (differentiator page): Joel's AI-native workflow — Figma-to-code token pipeline, Claude Code/Codex prompting patterns, human-in-the-loop judgment. This page does the "AI signals" work explicitly.
- **AI assistant** (differentiator feature): RAG chat trained on Joel's case studies, resume, and methodology. The build itself becomes a case study on the How I Build page.
- **About**: short, personality-forward (guitarist 20+ yrs, East Bay, dogs Conan & Pinto), plus résumé download.
- **Colophon/repo link**: public GitHub repo, stack notes, performance scores.

## Case Study Slate (target 4–5)
1. **Asteri AI** (now a lead piece — shipped, recent, enterprise AI): design system shipped to production in a six-week engagement. Raw material in content/raw/asteri.md (LOCAL-ONLY) — read its "Framing rules" section before any drafting. **DRAFTED 2026-07-11** (Joel authorized autonomous drafting; his edits still final): Narrative A, 523 words + deep-dive, live at /work/asteri/ on staging. Visuals are the four abstracted SVGs in src/assets/asteri/ (no screenshots, per decision 4).
2. **Finderly** (flagship, unrestricted IP — AI Vision Technologies): multi-modal AI UX (chat/photo/AR), Figma MCP token pipeline, React Native. Design + engineering in one story. **DRAFTED 2026-07-11** from Joel's design-cleanup branch summary (raw material: content/raw/finderly.md, LOCAL-ONLY): media-first-not-chatbot decision, 561 words + deep dive, live at /work/finderly/. Needs visuals (real screenshots allowed); see raw file's open questions for role/metrics gaps.
3. **Portfolio + RAG assistant build** (meta case study): decisions, stack, AI collaboration.
4. **StartupOS** (strongest legacy piece): rewrite into decision-narrative format, clearly dated, positioned as range. **DRAFTED 2026-07-11**: template-over-bespoke decision, 526 words, reuses old /work/startup-platform slug, closes by linking the instinct to Asteri. Joel to verify: the 2022 date and "Product Designer" role title in frontmatter are inferred from salvaged copy.
5. **ArtPärdē** (confirmed 2026-07-11 as the fifth piece). UX Rooted: cut. **DRAFTED 2026-07-11**: tool-judgment narrative (Webflow + fee-free Zeffy chosen on purpose for a volunteer-run non-profit; craft spent on brand). Deliberately 413 words, under the 500-800 band: the honest size for the project, padding would be the anti-pattern. Live at /work/artparde/. Scope confirmed by Joel: brand + site + ongoing content updates (they do their own posters/promo).
Legacy trAIn121 / Robert Half pieces: archive or cut. 2021 work dilutes.

## Tech Stack (defaults; revisit only with reason)
- **Framework**: **Astro** (decided session 1, 2026-07-11). MDX content collections with typed frontmatter, zero-JS default for Lighthouse, islands for interactive bits. React appears where interactivity earns it (RAG chat island); React depth is proven by the Asteri/Finderly case studies, not the site framework.
- **Styling**: CSS custom properties as the token system, documented as a mini design system.
- **Content**: MDX per case study. Frontmatter: title, role, timeframe, outcome metric, stack, meta description, OG image.
- **RAG assistant**: embeddings over site content; Claude API; serverless.
- **Hosting**: **Cloudflare Pages** (decided session 1, 2026-07-11; RAG assistant runs as a Pages Function + Vectorize on the same platform). Live at joelryerson-design.pages.dev; every push builds automatically, branches get preview URLs. Do NOT attach the joelryerson.design domain until cutover. Repo: GitHub, public — github.com/joelryerson/portfolio.
- **Interactions**: modern primitives (IntersectionObserver, CSS scroll-driven animation, View Transitions, native details/summary). No jQuery-era patterns. Real SVG icons with aria-hidden on decorative ones; no icon-font ligatures.

## Build Standards (non-negotiable)
- Semantic HTML, proper H1–H3 hierarchy, all case study copy as real text
- Per-page meta titles/descriptions + OG images (the old site failed this sitewide)
- Lighthouse 95+ across the board; publish the scores
- WCAG AA: keyboard nav, contrast, reduced-motion support
- Mobile-first (majority of recruiters review on phones)
- Dark/light mode

## Migration & Cutover
- Old Webflow site: leave live and untouched until the new site ships.
- Keep /work/[slug] URL structure; reuse existing slugs where content carries over; 301 anything renamed.
- ~~Salvage from Webflow before cancellation~~ → **DONE 2026-07-11.** Everything lives in content/raw/webflow-salvage/ (local-only): 6 pages of HTML + extracted copy, 247 original assets, résumé PDF, both stylesheets, full color/token inventory (old site had a Material-3-style token system in portfolio-assets.css). Old slugs for the 301 map are listed in its README.
- Cancel Webflow before next renewal. **Renewal date confirmed: October 18, 2026 = cutover deadline.** Salvage early so the date never becomes a scramble.
- DNS: point joelryerson.design + www to new host; verify OG previews, sitemap, robots after cutover.

## Workflow Rules
- Joel reviews all copy; drafts written in his voice, lightest possible AI fingerprint. His edits are final.
- Asteri: follow the framing rules in content/raw/asteri.md. No product screenshots or internal component/file names in public content until Joel clears scope.
- Never publish/deploy to production or cancel services without Joel's explicit go.
- Decisions made in-session get executed, not reopened.
- Update this CLAUDE.md whenever a decision is made or a standard changes. This file is the source of truth.

## Voice
Direct, plainspoken, light wit, bolded key phrases, short sections. Outcome-first sentences. No em dashes, no filler affirmations, no sycophancy. Case studies read like an engineer-designer explaining a decision to a peer, not a methodology recital.

## Open Decisions (resolve in session 1)
1. ~~Astro vs Next.js~~ → **Astro** (2026-07-11)
2. ~~Visual direction~~ → **Full redesign** (2026-07-11). New identity designed natively in the token system for the Design Engineer positioning. Webflow color values/assets salvaged as reference material only; nothing owed to the old look.
3. ~~Webflow renewal date~~ → **October 18, 2026** = cutover deadline (2026-07-11)
4. ~~Asteri screenshot/visuals scope~~ → **Assume no screenshots** (2026-07-11). Case study visuals are abstracted diagrams + neutralized code snippets only. If Julia later clears screenshots, that's a bonus, not a dependency.
5. ~~Which legacy pieces survive the cut~~ → **ArtPärdē in, UX Rooted out, trAIn121/Robert Half archived** (2026-07-11). Slate: Asteri, Finderly, Portfolio+RAG, StartupOS, ArtPärdē.
