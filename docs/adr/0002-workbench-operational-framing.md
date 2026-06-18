# Demo reframed as an operational "Privacy Workbench," not a linear presentation

We pivoted the demo from a linear, guided slide-stepper into a **working application a county
privacy officer uses day-to-day** — a sidebar app with a Dashboard, a tree-structured Governance
Inventory, a unified Review queue, and the model/compare/versions/SEDI screens as detail views. The
five governance beats are unchanged; what changed is their *presentation*: the live demo is now a
scripted **"privacy officer's workday"** driven through the workbench, instead of clicking through
slides. We did this because the bounty explicitly frames these models as *"operational governance
infrastructure,"* and a real review queue + dashboard directly satisfies its **human-oversight** and
**human-review-workflow** (extra-points) criteria — while we keep the storytelling the bounty weights
most by scripting the narrative path through the app.

## Considered alternatives
- **Keep the linear stepper** (safe; what we'd already shipped) — forgoes the operational-tool
  credibility. Kept as a fallback at `/presentation`.
- **Free-form tool with no narrative** — risks losing the non-technical policymaker, the exact
  failure mode the bounty warns about. Rejected.

## Consequences
- The statewide coverage **matrix was replaced by a tree-structured Governance Inventory** keyed to
  entity-type-applicable functions (no school-district marriage licenses), and humans work **exceptions
  in the queue**, never cell-by-cell — a cross-jurisdiction **Consistency Scan** bulk-flags
  inconsistencies into the queue. (See CONTEXT.md decision #10.)
- The workbench is now `/`; the stepper is `/presentation`. Existing screen components are reused as
  detail views, so the pivot is largely additive (new shell + dashboard + inventory + queue).
