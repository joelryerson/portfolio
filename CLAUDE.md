# Portfolio Rebuild — joelryerson.design v3

## Mission
Build Joel's portfolio from scratch as a custom-coded site, replacing the Webflow site entirely. Decision is made: full rebuild, nothing sacred from the old site. Target: the strongest possible Design Engineer positioning for the July 2026 market. Do not relitigate the rebuild decision or pad plans with caution about scope.

## Positioning
- Title: **Design Engineer** (not Senior Product Designer)
- Specialty: AI-native product design + design engineering — design systems, token pipelines, agentic/AI-assisted build workflows, enterprise SaaS
- The site itself is Exhibit A: custom-built, public repo, real token system, AI-native features. The portfolio must prove the positioning, not just claim it.

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
- **Home**: 5-second positioning statement, availability, 3–5 project cards, AI-stack strip, contact. No throat-clearing.
- **Work** (/work/[slug]): decision-narrative case studies (500–800 words) + optional "deep dive" expansion for detail. Live artifacts/demos embedded where possible.
- **How I Build** (differentiator page): Joel's AI-native workflow — Figma-to-code token pipeline, Claude Code/Codex prompting patterns, human-in-the-loop judgment. This page does the "AI signals" work explicitly.
- **AI assistant** (differentiator feature): RAG chat trained on Joel's case studies, resume, and methodology. The build itself becomes a case study on the How I Build page.
- **About**: short, personality-forward (guitarist 20+ yrs, East Bay, dogs Conan & Pinto), plus résumé download.
- **Colophon/repo link**: public GitHub repo, stack notes, performance scores.

## Case Study Slate (target 4–5)
1. **Asteri AI** (now a lead piece — shipped, recent, enterprise AI): design system shipped to production in a six-week engagement. Raw material in content/raw/asteri.md — read its "Framing rules" section before any drafting. Screenshots pending confidentiality clearance; abstracted diagrams and neutralized code snippets are the default visuals.
2. **Finderly** (flagship, unrestricted IP — AI Vision Technologies): multi-modal AI UX (chat/photo/AR), Figma MCP token pipeline, React Native. Design + engineering in one story.
3. **Portfolio + RAG assistant build** (meta case study): decisions, stack, AI collaboration.
4. **StartupOS** (strongest legacy piece): rewrite into decision-narrative format, clearly dated, positioned as range.
5. **ArtPärdē** (confirmed 2026-07-11 as the fifth piece). UX Rooted: cut.
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
- Salvage from Webflow before cancellation: CDN assets (cdn.prod.website-files.com), case study copy, color variable values, résumé PDF. All publicly fetchable.
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
