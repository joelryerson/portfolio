# Knowledge-base conflict report

Material conflicts found while building the curated dataset (2026-07-16).
In every case the knowledge base uses the narrower, safer public claim.

## 1. Asteri — "shipped to production" breadth

- **Case study** (frontmatter + body): "First design system shipped to production in six weeks."
- **Joel's correction** (recorded in CLAUDE.md, 2026-07-12): the first pass *added* a token
  layer, consolidation landed by week six, the homepage migration was still under review;
  the case study's "shipped to production" claims must be re-verified with Joel.
- **Resolution**: facts `ast-008`/`ast-009` state the narrower claim — token foundation in
  production on the pilot dashboard surfaces (~7 files, zero visual diff); engineering
  continued the rollout after the engagement; homepage migration under review. The blanket
  "design system shipped to production" phrasing is not used by the assistant.

## 2. Asteri — who decided the core table was off-limits

- **Earlier scripted answer**: "Joel left it intentionally unchanged."
- **Case study**: "Leadership added one constraint: a business-critical data table was
  off-limits… I planned the migration around it."
- **Resolution**: fact `ast-004` and the corrected fallback answer attribute the constraint
  to leadership and the planning-around-it to Joel.

## 3. Asteri — homepage migration sourcing

- The "homepage migration remained under review" status appears in Joel's briefs and the
  CLAUDE.md correction, but **not in the public case study**.
- **Resolution**: kept as `under_review` fact `ast-009` with an explicit limitation noting
  it is pending the case-study precision pass.

## 4. StartupOS — date and title provenance

- CLAUDE.md: the 2022 date and "Product Designer" title are *inferred from salvaged copy*
  and awaiting Joel's verification.
- **Resolution**: fact `sos-001` carries status `historical` plus a limitation stating the
  reconstruction. The assistant may state 2022 but discloses the provenance if pressed.

## 5. ArtPärdē — "runs without Joel" vs "ongoing"

- **Earlier scripted answer**: "the organization continues to run it without me / without Joel."
- **Case study**: "2024, ongoing… I still keep the site current when new shows land."
- **Resolution**: facts `ap-001`/`ap-004` and the corrected fallback say the org's tooling is
  volunteer-operable and the site has needed no rescuing, while Joel still does content
  updates when shows land. "Runs without him" is no longer claimed.

## 6. Role titles

- Experiment shells describe roles ("Product design and design systems", etc.); case-study
  frontmatter carries titles (Design Engineer / Product Designer / Brand & web).
- **Resolution**: `career.json` uses the case-study titles as canonical; descriptive role
  summaries remain as summaries, not titles.
