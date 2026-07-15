# Human review sheet — grounded portfolio assistant

Endpoint: http://localhost:8788/api/portfolio-ai · ran 2026-07-15T17:16:32.824Z
Score each answer 1–5 per column. The model has NOT scored itself.

## hr-01 — What did Joel personally own?

> mode: career · confidence: high · 40ms

Each case study names it precisely. Finderly: product design plus front-end implementation. Asteri: the styling audit, token architecture, and consolidation strategy. StartupOS: the reusable template system. ArtPärdē: identity and site. Where a team continued the work — like Asteri’s rollout — the case study says so.

Evidence: Finderly · case study (/work/finderly/) · Asteri · case study (/work/asteri/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-02 — What work did he implement himself?

> mode: career · confidence: high · 7621ms · tokens in/out undefined/undefined

He implemented a Material HCT‑generated color system with 57 semantic roles in Finderly’s React Native / Expo / TypeScript codebase, and he rebuilt the capture pipeline end‑to‑end (ordered multi‑capture, warm camera, review surface, living blueprint).

Evidence: Finderly · case study (/work/finderly/) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-03 — Which project best demonstrates product judgment?

> mode: project_question · confidence: high · 5000ms · tokens in/out undefined/undefined

Finderly best demonstrates product judgment. Joel’s decision to rebuild the platform as media‑first and state‑aware, cut features that did not add value, and implement honest‑interface practices all show clear product‑level judgment.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · What got cut (/work/finderly/#what-got-cut) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-04 — Which project shows the strongest systems thinking?

> mode: cross_project · confidence: high · 10730ms · tokens in/out undefined/undefined

Asteri’s token hierarchy and architecture demonstrate a clear systems‑thinking approach: it built a two‑layer token system, iterated to reduce multiple sources of truth, and mapped the tokens into CSS modules and Ant Design. Finderly also applied systems thinking—auditing 370 files and making design‑system decisions—but Asteri’s token infrastructure is the most explicit example.

Evidence: Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · The audit finding (/work/asteri/#the-finding) · Asteri · case study (/work/asteri/) · Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-05 — How technical is Joel?

> mode: career · confidence: high · 26ms

Joel implements what he designs. On Finderly that meant front-end work in the product’s React Native codebase; this portfolio itself is custom-coded with its own token system; and his build workflow is AI-assisted, with him directing the tools. The honest framing: a product designer with real front-end execution, not a platform engineer.

Evidence: Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-06 — How does Finderly compare with StartupOS?

> mode: cross_project · confidence: high · 21048ms · tokens in/out undefined/undefined

Finderly is an AI home‑repair app that Joel rebuilt as a media‑first, state‑aware product, featuring a persistent capture hero, a multi‑capture pipeline that supports up to six photos or a video, and a streamlined review surface. StartupOS, from 2022, was a founder‑education platform where Joel designed reusable template systems and copy across landing pages, dashboards, and networking features, using pre‑AI processes and Material Design foundations. While Finderly focuses on end‑user repair workflows and real‑time capture, StartupOS centers on educating founders with modular templates and a structured learning path. Both projects share Joel’s emphasis on reusable design systems, but their domains, user goals, and technology stacks differ markedly.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Finderly · What got cut (/work/finderly/#what-got-cut) · StartupOS · Template pivot (/work/startup-platform/#the-pivot) · StartupOS · 2022 seen from 2026 (/work/startup-platform/#2022-seen-from-2026)
Limitations: No public usage metrics are available for Finderly | No public job title for Joel at StartupOS | Comparison limited to approved facts

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-07 — What did Joel learn or revise during the Asteri work?

> mode: project_question · confidence: high · 2723ms · tokens in/out undefined/undefined

During his six‑week engagement at Asteri, Joel discovered that the existing token system duplicated values across four claimed sources of truth. He revised the architecture to a leaner semantic hierarchy with fewer sources, creating a two‑layer token system that generates CSS variables for CSS Modules and Ant Design. This redesign also addressed a widespread UI inconsistency where one style decision in ten files was hard‑coded rather than tokenized.

Evidence: Asteri · case study (/work/asteri/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · The audit finding (/work/asteri/#the-finding)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-08 — What is the strongest public evidence of visual design?

> mode: project_question · confidence: high · 6643ms · tokens in/out undefined/undefined

The most public visual design evidence is Joel’s work on the ArtPärdē brand, including the wordmark that was concepted with image‑model assistance, iterated through a typeface study, and vectorized letter‑by‑letter. The brand identity and Webflow site remain active and are updated quickly for new shows.

Evidence: ArtPärdē · case study (/work/artparde/) · ArtPärdē · case study (/work/artparde/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-09 — What is not demonstrated publicly?

> mode: cross_project · confidence: high · 13054ms · tokens in/out undefined/undefined

The Asteri public case study does not include product screenshots; it uses abstracted diagrams and neutralized artifacts. Only pilot surfaces were shipped to production, so the full production rollout is not publicly demonstrated.

Evidence: Asteri · case study (/work/asteri/) · Asteri · Design-system foundation (/work/asteri/#what-got-built)
Limitations: No publicly verifiable evidence for Finderly metrics or imagery is available in the approved facts.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-10 — What should I ask Joel in an interview?

> mode: career · confidence: high · 10737ms · tokens in/out undefined/undefined

You could ask him to walk through the steps he took when shipping the product‑wide UX overhaul for Finderly, how he built the Material HCT‑based color system, what guided his decision to rebuild the capture pipeline, how he audited and tokenized UI consistency at Asteri, and how he applied a two‑layer token hierarchy to Ant Design. For a broader view, you might also ask about the reusable template system he designed for StartupOS or how he built the brand identity for ArtPärdē.

Evidence: Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Asteri · The audit finding (/work/asteri/#the-finding) · Asteri · Infrastructure-first pivot (/work/asteri/#the-pivot) · Asteri · Design-system foundation (/work/asteri/#what-got-built)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-11 — Is Joel more suited to product design or design engineering?

> mode: role_comparison · confidence: high · 16507ms · tokens in/out undefined/undefined

Joel has a documented record in both product design and design engineering. In product design he led a full UX overhaul for Finderly and designed reusable templates for StartupOS. In design engineering he implemented a Material HCT color system, rebuilt the capture pipeline, and built a two‑layer token hierarchy for Asteri. Both areas are supported by the projects listed below.

Evidence: Finderly · case study (/work/finderly/) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Finderly · case study (/work/finderly/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · Zero-visual-diff tradeoff (/work/asteri/#the-tradeoff) · StartupOS · case study (/work/startup-platform/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-12 — Which case study should I open first for a design-systems role?

> mode: cross_project · confidence: high · 4504ms · tokens in/out undefined/undefined

Start with the Asteri case study to see how Joel built a design system foundation for a seed‑stage AI startup, including the token architecture and initial system. Next, look at Finderly to see how he implemented a Material HCT‑generated color system, audited 370 files for consistency, and shipped a media‑first UX overhaul.

Evidence: Asteri · case study (/work/asteri/) · Asteri · Infrastructure-first pivot (/work/asteri/#the-pivot) · Finderly · case study (/work/finderly/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-13 — What tradeoffs did Joel make on Finderly?

> mode: career · confidence: high · 8818ms · tokens in/out undefined/undefined

Joel made several key tradeoffs on Finderly: he shifted the app to a media‑first, state‑aware design, removed drag‑to‑reorder and moved sound recording out of review, hid progress bars while backend tracking was unreliable, replaced a misleading cookie banner with real privacy controls, recorded AI consent passively, overhauled the capture pipeline to support ordered multi‑capture and a living blueprint state, and implemented a Material HCT color system with 57 semantic roles. These decisions were part of a month‑long, agentic workflow that produced 379 commits across 303 files.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · What got cut (/work/finderly/#what-got-cut) · Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with) · Finderly · case study (/work/finderly/)
Limitations: No public usage metrics are provided in the case study.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-14 — How does Joel work with AI tools?

> mode: project_question · confidence: high · 10312ms · tokens in/out undefined/undefined

Joel leverages AI in his product design by delegating component building to AI agents that work under his direction while he retains control over design decisions, quality assurance, and final cuts. In the Finderly project, he orchestrated an agentic workflow where AI agents constructed the UI, and he performed taste, cuts, and QA manually. He also employed AI to analyze and streamline the capture pipeline, creating a state‑driven "living blueprint" that reflects the upload lifecycle.

Evidence: Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Finderly · Capture pipeline (/work/finderly/#making-capture-worth-leading-with)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-15 — What happened after Joel's Asteri engagement ended?

> mode: project_question · confidence: high · 4135ms · tokens in/out undefined/undefined

After Joel’s six‑week engagement at Asteri ended, the token foundation he built was already in production on the seven pilot dashboard files, and engineering continued rolling it out across the rest of the codebase with the branch merged to main.

Evidence: Asteri · Where it landed (/work/asteri/#where-it-landed) · Asteri · Zero-visual-diff tradeoff (/work/asteri/#the-tradeoff)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-16 — How recent is Joel's strongest work?

> mode: career · confidence: high · 2954ms · tokens in/out undefined/undefined

Joel’s most recent shipped work is the Finderly redesign, completed in June–July 2026.

Evidence: Finderly · The decision (media-first) (/work/finderly/#the-decision) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-17 — What kind of company gets the most from Joel?

> mode: cross_project · confidence: high · 5520ms · tokens in/out undefined/undefined

Companies building AI‑native products or enterprise SaaS platforms benefit most from Joel’s work, as he delivers end‑to‑end design engineering, design systems, and token pipelines that improve consistency and speed to market. His recent projects—Finderly’s AI home‑repair app, Asteri’s AI startup pilot, and the brand and web for ArtPärdē—demonstrate success in these contexts.

Evidence: Finderly · case study (/work/finderly/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · ArtPärdē · case study (/work/artparde/) · StartupOS · case study (/work/startup-platform/)


| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-18 — ROLE: Senior Product Designer. 5+ years shipping consumer or enterprise software; end-to-end own…

> mode: role_comparison · confidence: medium · 24059ms · tokens in/out undefined/undefined

Strong alignment: He shipped a product‑wide UX overhaul at Finderly (June–July 2026) and built design systems at Finderly and Asteri.
Partial alignment: The JD calls for 5+ years shipping; the evidence shows a 1‑month engagement.
Honest gaps: No public evidence of 5+ years shipping or formal people‑management experience.
Questions for Joel: How many years of shipping experience does he have, and does he have any formal management experience?

Evidence: Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Asteri · Where it landed (/work/asteri/#where-it-landed) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · Infrastructure-first pivot (/work/asteri/#the-pivot) · Finderly · The decision (media-first) (/work/finderly/#the-decision)
Limitations: Cannot confirm 5+ years of shipping experience. | No public evidence of formal people‑management experience.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-19 — ROLE: Design Engineer. Production UI in React or React Native; owns design tokens and theming in…

> mode: role_comparison · confidence: high · 20077ms · tokens in/out undefined/undefined

Strong alignment: Joel has built design token systems and theming infrastructure in React Native/Expo with TypeScript, as in Finderly and Asteri. Partial alignment: He has implemented AI‑assisted workflows and accessibility‑focused decisions, but the role may require broader AI tooling and deeper accessibility coverage. Honest gaps: There is no public evidence of formal people‑management experience or leading large engineering teams. Questions for Joel: How do you coordinate token updates across multiple product lines without a formal team?

Evidence: Finderly · case study (/work/finderly/) · Finderly · case study (/work/finderly/) · Asteri · Design-system foundation (/work/asteri/#what-got-built) · Asteri · Where it landed (/work/asteri/#where-it-landed) · Finderly · case study (/work/finderly/) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month)
Limitations: No public evidence of formal people‑management experience.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |

## hr-20 — ROLE: Product Design Manager. 3+ years managing 4+ designers; hiring and performance management;…

> mode: role_comparison · confidence: high · 6959ms · tokens in/out undefined/undefined

Strong alignment: None of the approved facts show people‑management or hiring experience.
Partial alignment: Joel collaborated with engineering and leadership on design system and product overhauls at Asteri and Finderly.
Honest gaps: No evidence of managing 4+ designers, hiring, performance management, or mentorship; no formal role title indicating management.
Questions for Joel: How did Joel contribute to hiring, mentorship, or performance management in any of his engagements?

Evidence: Asteri · Design-system foundation (/work/asteri/#what-got-built) · Finderly · Agentic workflow (/work/finderly/#how-one-designer-ships-this-in-a-month) · Fact (limitation)
Limitations: No public evidence of people‑management, hiring, or performance‑management experience.

| accuracy | evidence | candor | relevance | concision | usefulness | status precision | confidence calib. | time saved | notes |
|---|---|---|---|---|---|---|---|---|---|
|   |   |   |   |   |   |   |   |   |  |
