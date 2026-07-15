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


---

# Resolution addendum (2026-07-17 — Joel's decisions applied)

| # | Status | Applied resolution |
|---|---|---|
| 1 | **Resolved (narrow claim approved)** | Assistant states only: token foundation reached production on a limited set of pilot dashboard surfaces (~7 files, no intended visual change); engineering continued the broader rollout. The case-study headline stays flagged for a precision pass. |
| 2 | **Resolved (approved)** | "The homepage migration remained under review when Joel's engagement ended," with the not-yet-in-case-study limitation retained. |
| 3 | Resolved earlier | Leadership constraint wording in use. |
| 4 | **Resolved (split decision)** | 2022 approved. "Product Designer" NOT published as a verified formal title — the assistant describes the work ("worked on product design … including its reusable template system"). |
| 5 | Resolved earlier | Ongoing-maintenance wording in use. |
| 6 | **Resolved (narrow line approved)** | Only: "Before product design: emergency medicine, caregiving, and enterprise sales." Full chronology reserved for the About page. |

## Remaining unresolved items

1. The public Asteri case-study headline ("first design system shipped to production in six weeks") still needs its precision pass — a content edit outside this experiment's scope.
2. The homepage-migration status still is not documented in the public case study (same precision pass).
3. Public-evidence limitations that are constraints, not conflicts: no Asteri product imagery, no public outcome metrics, no public people-management evidence.
