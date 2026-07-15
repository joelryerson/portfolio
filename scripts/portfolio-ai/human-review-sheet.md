# Human review sheet — grounded portfolio assistant

Endpoint: http://localhost:8788/api/portfolio-ai · ran 2026-07-15T18:36:51.061Z
Score each answer 1–5 per column. The model has NOT scored itself.

## hr-01 — What did Joel personally own?

> mode: career · confidence: high · 37ms

Each case study names it precisely. Finderly: product design plus front-end implementation. Asteri: the styling audit, token architecture, and consolidation strategy. StartupOS: the reusable template system. ArtPärdē: identity and site. Where a team continued the work — like Asteri’s rollout — the case study says so.

Evidence: Finderly · case study (/work/finderly/) · Asteri · case study (/work/asteri/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-02 — What work did he implement himself?

> mode: cross_project · confidence: high · 8261ms · tokens in/out undefined/undefined

He implemented the end‑to‑end capture pipeline and the front‑end redesign for Finderly, built the two‑layer token hierarchy and pilot dashboard migration for Asteri, designed the wizard flow for StartupOS, and created the ARTPÄRDĒ wordmark for ArtPärdē.

Evidence: Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Finderly · case study (/work/finderly/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · Zero-visual-diff tradeoff (/work/asteri/#the-tradeoff) · StartupOS · Problem-Solution Fit wizard (/work/startup-platform/#getting-specific) · ArtPärdē · case study (/work/artparde/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-03 — Which project best demonstrates product judgment?

> mode: cross_project · confidence: high · 5096ms · tokens in/out undefined/undefined

Finderly best demonstrates product judgment, as evidenced by the shipped decisions to rebuild the app media‑first, cut unnecessary features, and implement honest‑interface practices.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · What got cut (/work/finderly/#what-got-cut) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-04 — Which project shows the strongest systems thinking?

> mode: cross_project · confidence: high · 6382ms · tokens in/out undefined/undefined

Asteri demonstrates the strongest systems thinking, as its work involved a comprehensive audit of roughly 370 frontend files, the proposal and implementation of a two‑layer token hierarchy that generates CSS variables, and the integration of those tokens into an Ant Design theme layer—all of which reflect a systematic, architecture‑driven approach to design consistency.

Evidence: Asteri · The audit finding (/work/asteri/#the-finding) · Asteri · Infrastructure-first pivot (/work/asteri/#the-pivot) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · case study (/work/asteri/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-05 — How technical is Joel?

> mode: career · confidence: high · 15ms

Joel is a product designer who owns implementation. On Finderly that meant front-end work in the product’s React Native codebase; this portfolio itself is custom-coded with its own token system; and his build workflow is AI-assisted, with him directing the tools — architecture, prompts, review, QA, and final acceptance stay his. The honest framing: product judgment first, with real front-end execution — not a platform or backend engineer.

Evidence: Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-06 — How does Finderly compare with StartupOS?

> mode: cross_project · confidence: high · 10000ms · tokens in/out undefined/undefined

Finderly is an AI home‑repair app that was redesigned as a media‑first, state‑aware product in June–July 2026, built with React Native/Expo/TypeScript and a Material HCT 57‑role color system; the redesign and front‑end update were shipped in July 2026 and the product remains active. StartupOS was a founder‑education platform launched in 2022 that focused on reusable template systems and Material Design foundations; its MVP shipped within five months and the work is now historical.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · case study (/work/finderly/) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · StartupOS · case study (/work/startup-platform/) · StartupOS · 2022 seen from 2026 (/work/startup-platform/#2022-seen-from-2026)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-07 — What did Joel learn or revise during the Asteri work?

> mode: project_question · confidence: high · 10ms

The audit of roughly 370 frontend files found that only about one style decision in ten flowed through a token — the rest were restated inline, per file. Joel’s own first token architecture then repeated the disease in token clothing: values duplicated across four places that each claimed to be the source of truth. He recognized the duplication risk and simplified to a leaner two-layer architecture generating CSS variables and mapping into Ant Design, with production adoption deliberately limited to the pilot dashboard surfaces. The revision of his own approach is the point of the story.

Evidence: Asteri · The audit finding (/work/asteri/#the-finding) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · Zero-visual-diff tradeoff (/work/asteri/#the-tradeoff)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-08 — What is the strongest public evidence of visual design?

> mode: cross_project · confidence: high · 5006ms · tokens in/out undefined/undefined

The most publicly visible evidence of Joel Ryerson’s visual design work is the ArtPärdē brand identity and Webflow website he built in 2024, which includes the ARTPÄRDĒ wordmark that was concepted with AI assistance and then manually refined and vectorized. This work is publicly accessible and demonstrates his design process and output.

Evidence: ArtPärdē · case study (/work/artparde/) · ArtPärdē · case study (/work/artparde/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-09 — What is not demonstrated publicly?

> mode: career · confidence: high · 12ms

The honest portfolio-level gaps: limited quantified product or business outcomes; no public evidence of formal people management, hiring, or performance management; limited evidence of work at large organizational scale; Asteri’s full design-system rollout is not shown as completed and its homepage migration remained under review; Asteri product imagery is abstracted; and the exact formal StartupOS title is not publicly verified.

Evidence: Public-evidence limitation (limitation) · Asteri · Where it landed (/work/asteri/#where-it-landed)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-10 — What should I ask Joel in an interview?

> mode: cross_project · confidence: high · 11271ms · tokens in/out undefined/undefined

Consider asking Joel about the following:
1. How he led the Finderly UX overhaul, coordinating 379 commits across 303 files.
2. The design and implementation of the multi‑capture pipeline and living‑blueprint analysis.
3. His choices in building the Material HCT‑generated color system with 57 semantic roles.
4. The rationale behind cutting features such as drag‑to‑reorder and relocating sound recording.
5. The audit of roughly 370 frontend files at Asteri and how he identified style inconsistencies.
6. How he pitched and built a two‑layer token hierarchy for Asteri, including CSS Modules and Ant Design integration.
7. Strategies used to navigate the off‑limits business‑critical data table at Asteri.
8. Designing a reusable Learning Unit template at StartupOS and its impact on content consistency.
9. Building ArtPärdē’s brand identity and maintaining its Webflow site.

Evidence: Finderly · case study (/work/finderly/) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Finderly · case study (/work/finderly/) · Finderly · What got cut (/work/finderly/#what-got-cut) · Asteri · The audit finding (/work/asteri/#the-finding) · Asteri · Infrastructure-first pivot (/work/asteri/#the-pivot)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-11 — Is Joel more suited to product design or design engineering?

> mode: career · confidence: high · 6ms

Joel is best suited to an evolving hybrid role: product designer first, with genuine design-engineering and front-end ownership. His core strength is deciding how a product should work and feel, but he now also implements and maintains those decisions in code. Traditional roles separated product design from front-end execution; AI-assisted development has made that boundary more fluid, and Joel’s recent work — Finderly end to end, Asteri’s token foundation — shows how one person can responsibly own more of the path from product judgment to production.

Evidence: Finderly · case study (/work/finderly/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Approved career timeline (limitation)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-12 — Which case study should I open first for a design-systems role?

> mode: cross_project · confidence: high · 3535ms · tokens in/out undefined/undefined

For a design‑systems role, open the Asteri case study first, as it documents the creation of a company‑wide design system foundation, including token hierarchy and CSS integration.

Evidence: Asteri · case study (/work/asteri/) · Asteri · Design-system foundation (/work/asteri/#what-got-built)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-13 — What tradeoffs did Joel make on Finderly?

> mode: project_question · confidence: high · 13117ms · tokens in/out undefined/undefined

Joel made tradeoffs on Finderly by shifting the product from a chat‑first to a media‑first, state‑aware experience (fin‑002), cutting features that did not justify their complexity—such as drag‑to‑reorder for review media and moving sound recording out of the review flow (fin‑005)—and simplifying the interface by hiding progress bars when backend tracking was unreliable, replacing a misleading cookie banner with real privacy controls, and recording web AI consent passively rather than falsely claiming it was explicit (fin‑007).

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · What got cut (/work/finderly/#what-got-cut) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-14 — How does Joel work with AI tools?

> mode: role_comparison · confidence: high · 7452ms · tokens in/out undefined/undefined

Joel defines product intent and direction, then uses AI agents to build components under his guidance; he remains in control of architecture, prompts, review, QA, cuts, final acceptance, and ongoing maintenance.

Evidence: Profile (limitation) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-15 — What happened after Joel's Asteri engagement ended?

> mode: project_question · confidence: medium · 6177ms · tokens in/out undefined/undefined

After Joel’s six‑week engagement at Asteri ended, the homepage migration was still under review, and engineering continued the broader rollout of the design system that began with the pilot dashboard surfaces.

Evidence: Asteri · case study (/work/asteri/) · Asteri · Where it landed (/work/asteri/#where-it-landed)
Limitations: No additional details beyond the approved facts are available.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-16 — How recent is Joel's strongest work?

> mode: career · confidence: high · 8ms

Joel’s most recent major shipped work is Finderly’s large redesign and front-end update, merged in July 2026 — 379 commits across 303 files. Finderly remains an active, ongoing product, so that release is the latest major milestone rather than a finished endpoint. Before that: Asteri’s token foundation (May–June 2026).

Evidence: Finderly · case study (/work/finderly/) · Asteri · Where it landed (/work/asteri/#where-it-landed)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-17 — What kind of company gets the most from Joel?

> mode: career · confidence: high · 22ms

Early-stage product teams get the most from Joel, especially AI, SaaS, or consumer-product teams that need one designer to move from product strategy and UX decisions into polished front-end implementation. He is particularly useful where design systems are immature and hands-on ownership is valued — the pattern in both Finderly and Asteri.

Evidence: Finderly · case study (/work/finderly/) · Asteri · case study (/work/asteri/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-18 — ROLE: Senior Product Designer. 5+ years shipping consumer or enterprise software; end-to-end own…

> mode: role_comparison · confidence: high · 7734ms · tokens in/out undefined/undefined

Strong alignment: Joel has 6+ years of professional design experience (2020–present) and has shipped end‑to‑end product redesigns and implementations at Finderly (consumer AI home‑repair app) and Asteri (enterprise life‑sciences platform), demonstrating ownership across design and front‑end engineering.

Partial alignment: While Joel has shipped work for consumer and enterprise clients, the publicly documented outcomes are limited to a few projects and do not include a large‑scale enterprise rollout or extensive quantified business impact.

Honest gaps: Publicly available evidence does not include large‑organization scale work or measurable product/business outcomes beyond the scope of the listed projects.

Questions for Joel: None.

Evidence: car-001 (limitation) · Finderly · case study (/work/finderly/) · Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · case study (/work/finderly/) · Asteri · case study (/work/asteri/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-19 — ROLE: Design Engineer. Production UI in React or React Native; owns design tokens and theming in…

> mode: role_comparison · confidence: high · 14045ms · tokens in/out undefined/undefined

Strong alignment: Joel’s work on Finderly demonstrates ownership of production UI in React Native, design tokens and theming, TypeScript, AI‑assisted workflows, and bridging design and engineering. Partial alignment: None. Honest gaps: No approved evidence of accessibility work or large‑team leadership. Questions for Joel: What accessibility work has Joel done in his recent projects?

Evidence: Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · case study (/work/finderly/) · No accessibility evidence (limitation)
Limitations: No evidence of accessibility work documented in the approved facts.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-20 — ROLE: Product Design Manager. 3+ years managing 4+ designers; hiring and performance management;…

> mode: role_comparison · confidence: medium · 9071ms · tokens in/out undefined/undefined

Strong alignment: None.
Partial alignment: None.
Honest gaps: Joel has no publicly documented evidence of managing a design team, hiring, performance management, mentorship, or roadmap partnership with PM and engineering.
Questions for Joel: None.

Evidence: Finderly · case study (/work/finderly/) · Asteri · case study (/work/asteri/) · StartupOS · case study (/work/startup-platform/) · ArtPärdē · case study (/work/artparde/)
Limitations: No publicly available evidence of people‑management experience in Joel’s portfolio. | The available project descriptions focus on design and implementation rather than team leadership.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |
