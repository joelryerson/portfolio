# Asteri AI — approved public facts



Role: Design Engineer. Dates: May–June 2026. Organization: Asteri (seed-stage AI startup).

Summary: Six-week engagement: styling audit, token infrastructure, pilot migration of dashboard surfaces with zero visual diff; engineering continued the rollout.



Status vocabulary: shipped and implemented mean the work went live; proposed, in_progress,

and under_review mean it did NOT fully ship and must never be described as shipped;

historical marks dated work; not_publicly_verifiable marks stated public limitations.



### Joel's six-week engagement (May–June 2026) at Asteri, a seed-stage AI startup building a work-intelligence platform for Fortune 500 life-sciences teams, produced the company's first design system foundation.
- Status: shipped (May–June 2026)
- Category: scope
- Evidence: Asteri · case study — /work/asteri/
- Skills: Design systems

### Joel audited roughly 370 frontend files and found systemic UI inconsistency: about one style decision in ten flowed through a token; the rest were restated inline, per file, by hand.
- Status: shipped
- Category: finding
- Evidence: Asteri · The audit finding — /work/asteri/#the-finding
- Skills: Audit

### Joel proposed token infrastructure first instead of restyling screens, pitching it to leadership as maintenance cost and regression risk; it became the direction in one conversation.
- Status: shipped
- Category: decision
- Evidence: Asteri · Infrastructure-first pivot — /work/asteri/#the-pivot
- Skills: Design systems, Stakeholder communication

### Leadership made the business-critical data table off-limits (no redesign, restyle, or rebuild); Joel planned the migration around that constraint rather than fighting it.
- Status: shipped
- Category: constraint
- Evidence: Asteri · Infrastructure-first pivot — /work/asteri/#the-pivot
- Skills: Migration planning

### What got built: a two-layer token hierarchy (primitives aliased into semantic tokens) generating CSS variables for CSS Modules and custom components, mapped into the Ant Design theme layer.
- Status: shipped
- Category: technical
- Evidence: Asteri · Design-system foundation — /work/asteri/#what-got-built
- Skills: Token architecture

### Joel's first token architecture had values duplicated across four claimed sources of truth; he identified the flaw and iterated to a leaner semantic architecture with fewer sources of truth.
- Status: shipped
- Category: iteration
- Evidence: Asteri · case study (deep dive) — /work/asteri/
- Skills: Token architecture

### The pilot migration covered about seven dashboard files with appearance intentionally unchanged: zero visual diff, QA'd against a mock server, reviewable and testable by design.
- Status: shipped
- Category: execution
- Evidence: Asteri · Zero-visual-diff tradeoff — /work/asteri/#the-tradeoff
- Skills: Migration planning

### The token foundation reached production on the pilot dashboard surfaces within the engagement, with documentation and a migration path the engineering team adopted to continue the rollout after Joel left.
- Status: shipped
- Category: outcome
- Evidence: Asteri · Where it landed — /work/asteri/#where-it-landed
- Skills: Design systems
- Limitation: Scope precision: production reach within the engagement was the pilot surfaces; the broader rollout was continued by engineering after the engagement.

### The product homepage's migration remained under review when the engagement ended.
- Status: under_review
- Category: status
- Evidence: Asteri · case study — /work/asteri/
- Limitation: Stated by Joel for these prototypes; not yet spelled out in the public case study, which is awaiting a precision pass.

### Public product imagery for Asteri is limited: the case study uses abstracted diagrams and neutralized artifacts rather than product screenshots, due to client constraints.
- Status: not_publicly_verifiable
- Category: limitation
- Evidence: Public-evidence limitation — /work/asteri/