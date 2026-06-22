# Context — County Data Governance Model Orchestration

Project for the **HITLAB × UVU World Cup Hackathon 2026**, bounty jointly sponsored by the
**Utah Office of Data Privacy** and the **Gary R. Herbert Institute for Public Policy (UVU)**.

## The bounty in one sentence

Demonstrate — in a way **policymakers** (legislators, county/city officials, clerks, privacy &
records officers, the public) can grasp in minutes — how **AI agent orchestration** can
**create and maintain** comprehensive **data governance models** at scale across thousands of
governmental entities, advancing the goal of **equal data rights under the law**.

Judging weights *visual storytelling, clarity, scalability, policy relevance* **above** technical
completeness. "A partially functional prototype with exceptional visualization, storytelling, and
policy insight may score higher than a fully functional technical implementation that fails to
clearly communicate the vision."

## Hard constraints

- **Code freeze + live presentations:** 2026-06-18, 2:00 PM. ~45-min drive → must finish by ~1:15 PM.
- **Build window:** ~20 hours overnight starting 2026-06-17 ~5:15 PM. Sleep optional.
- **Deliverable:** live presentation + submitted GitHub repo.
- **Team:** Craig Cossairt + Valerie Adams (capacity/skills TBD).

## Domain glossary (authoritative — from the bounty's provided definitions)

The canonical governance model is a hierarchy, then per-record governance fields:

`Government Unit → Office → Core Function → Primary Duty → Transaction → Related Record → {governance fields}`

| Term | Definition |
| --- | --- |
| **Government Unit** | The unique legal/administrative/political entity (state agency, county, municipality, special district, public education) with authority to govern within an area. |
| **Office** | The division/department/administrative unit responsible for providing public services. |
| **Core Function** | A governmental entity's statutory responsibilities or obligations. |
| **Primary Duty** | Specific tasks/actions critical to the entity's purpose, mission, or operation (the procedures for each core function). |
| **Transaction** | Any interaction or exchange between the entity and a member of the public in furtherance of a primary duty. |
| **Related Record** | Documentary material/data (electronic or physical) collected or generated in the course of a transaction. |
| **Personal Data in the Records** | Any information in a record linked or reasonably linkable to an identified/identifiable individual. |
| **Use of Personal Data** | How personal data is processed / operations performed on it. |
| **Purpose of Processing** | The reason personal data is processed. |
| **Statutory Authorization** | The legal authority that requires/allows the entity to process the personal data. |
| **Value of the Records** | Historical, administrative, legal, or fiscal value. |
| **Primary Classification** | How the record is classified (private, controlled, protected, exempt) + the citation. |
| **Secondary Classification** | The classification of personal data within a record + the citation. |
| **Retention & Disposition** | How long records must be retained and when they must be destroyed. |

### Governance rules of thumb (from the Rules sheet)
- Historical records → generally **public**; retained **permanently**.
- Administrative/legal/fiscal records → classified as specified by law; destroyed when no longer needed.
- **Personal data in a record is private unless otherwise classified by law.**
- Records shared with another gov entity → comply with Utah Code §63G-2-206 + data sharing agreement.
- Security baseline → NIST SP 800-53.

### The 10 candidate specialized agents (from the bounty)
Legal Authority · Purpose · Use · Data Minimization · Records · Classification · Retention ·
Decision Point · Redaction · Quality Assurance.

### Equal-data-rights thesis
Today, similar information is governed *differently* across entities (e.g., an SSN or DOB treated
one way by County A and another by City B). This creates **unequal privacy protections** for
identical data. A standardized, orchestrated model surfaces and harmonizes these inconsistencies.

### Relationships (cardinality)
- A **Government Unit** has many **Offices**; an **Office** has many **Core Functions**.
- A **Core Function** has many **Primary Duties**; a **Primary Duty** has many **Transactions**.
- A **Transaction** produces many **Related Records** and may contain **Decision Points**.
- A **Related Record** contains **Personal Data** and has exactly one set of governance fields.
- The same **Function** (e.g. business license) exists across multiple **Government Units** — this
  overlap is what makes the **equal-data-rights** comparison possible.

### Flagged ambiguities (the engine must NOT conflate these)
- **Statutory Authorization** (authority for the *function*) vs **Authority for Processing Personal
  Data** (authority for the *data*) — the spreadsheet keeps these as separate columns. Often the
  same cite, but distinct fields.
- **Primary Classification** (of the *record*) vs **Secondary Classification** (of the *personal
  data within* the record) — distinct; the SSN sits in secondary.
- **Retention & Disposition** (of the *record*) vs **Retention Period for Personal Data** (when the
  *personal data inside* must be deleted) — a record can be retained permanently while specific
  personal data is removed earlier.
- **Record** vs **Personal Data** — personal data is *contained in* a record; it can be deleted
  while the record persists.
- _Avoid_ "document" for **Record**, "citizen data" for **Personal Data**, "department" loosely for
  **Office**.

### Example dialogue
> **Builder:** "The marriage license is retained permanently — so the SSN is kept forever too?"
> **Domain expert:** "No. **Retention & Disposition** of the *record* is permanent, but the SSN is
> **Personal Data** with its own handling — §81-2-303(4) says it's not even recorded on the license.
> That's why it lands in **Secondary Classification**, not Primary, and why QA flags it for review."

## Provided artifacts (local files)
- `Marriage Model.pdf` — the canonical visual output to emulate.
- `Copy of Data Governance Models (5_1_26).xlsx` — sheets: Marriage License Model (detailed,
  multi-transaction), Marriage Model Category Descriptions, **General Functions** (catalog),
  General Function Category Descriptions, Rules, Definitions. **This is our ground-truth data.**
- `WORKFLOW FOR CREATING DATA GOVERNANCE MODELS.pdf` — the 10-step creation workflow.
- `Data Governance Models - {Definitions, Rules, Category Description}.pdf`.

## Decisions
_(recorded as we grill — see docs/adr/ for the load-bearing ones)_

1. **Team split.** Valerie → engine (orchestration + data). Craig → story (frontend demo +
   narrative), using Claude Code for build + Claude Design for UI polish. Interface = a frozen
   JSON governance-model schema. Both build in parallel overnight.
2. **Engine realism = HYBRID.** Real Claude-powered specialized agents generate real governance
   fields live from a **curated local corpus** (Utah Code excerpts, retention schedules,
   classification statutes we pre-load) — not live legal web-scraping. Maintenance = a real agent
   re-run triggered by a seeded legislative diff. **Always pre-cache a golden run as the on-stage
   safety net** — the live demo must never depend on a cold API call succeeding.
3. **Content scope (authored once, used twice):**
   - **Hero model: Marriage License (County Clerk)** — validated against the spreadsheet ground truth.
   - **Scale + equal-rights model: Business License**, generated live, as **Utah County
     (unincorporated) vs. Orem City** (same owner PII, divergent classification/retention/public-disclosure).
     Orem = UVU's host city, so it lands with the room.
4. **Demo spine = 5 beats**, built in this priority order:
   1. Human-in-the-loop review/approval (highest)
   2. Orchestration "watch it build"
   3. Equal-data-rights comparison
   4. Maintenance loop (legislative change → detect → diff → approve → v2) — *min-credible, can be canned*
   5. Scale view (entity × function grid; hero populated, business license live, rest "ready") — *min-credible*
   - Guardrail: #4 and #5 are bounty "complete-miss" criteria if absent — they ship even if light.
   - Stretch (only if ahead): Redaction Agent → "public-release view, X redacted and why."
5. **One bounty only** (County Data Governance). **SEDI/KERI is a bonus tie-in**, not a second
   submission: a narrative + architecture-diagram layer (governance models = *policy layer* ↔
   SEDI/KERI = *verifiable-identity enforcement layer* ↔ Agentic Healthcare Authorization = the
   cross-domain example) + one statute-grounded **SSN before/after overlay** on the marriage license
   (Utah Code §81-2-303(4): SSN not on the license, passed to DHHS/ORS → with SEDI, a verifiable
   credential the clerk never stores). Built last, touches nothing in the spine.
6. **Schema contract LOCKED** (→ ADR 0001): a `GovernanceModel` of
   `transactions[] → records[] → fields{}`, where **every `Field` carries provenance**
   (`value`, `agent`, `citations[]`, `confidence`, `reviewStatus`, `reviewedBy`, `note`, optional
   `sediEnforcement`). Versioning = full snapshot per version + `changelog[]` of field-level
   `{before, after, rationale}` diffs. Equal-rights = two instances sharing `functionId`, different
   `governmentUnit`/`entityName`. The 10 agents map to fields (Legal Authority → statutory/processing
   authority; Classification → primary/secondary; Retention → retention + GRS; etc.).
7. **Narrative spine.** Character: **Chris B.** (a friendly wink at the bounty owner, the State CPO),
   a privacy/records officer who must deliver
   compliance + equal data rights across thousands of functions with a tiny team. 5-min arc:
   (1) the problem/scale → (2) watch it build + human approves v1 [core] → (3) equal data rights
   (County vs City) → (4) it maintains itself (bill → diff → v2) → (5) scale grid + SEDI/architecture
   coda. Story > feature tour.
8. **Stack (locked).** Single TS repo: `/shared` (schema), `/engine` (Valerie), `/web` (Craig, Next.js
   + Tailwind + shadcn + React Flow + Framer Motion, Vercel), `/data` (corpus + committed golden runs).
   **Replay-event-log demo architecture**: frontend replays `events.json` by default (API-failure-proof);
   a "Live" toggle calls the engine only for the business-license live-gen, cached run one key away.
   No database — static JSON.
9. **UI pivot → "Utah Privacy Workbench" (operational application).** Reframed from a linear
   presentation stepper into a **working application a privacy/records officer uses** — a dashboard +
   **review queue** + the existing screens as detail views. The five beats from #4 are unchanged; what
   changes is their *presentation*: the **live demo is a scripted "privacy officer's workday"** driven
   through the workbench (dashboard → review queue → approve → legislative alert → harmonize → vision).
   Targets the bounty's "operational governance infrastructure" + "human review workflows" (extra
   points) while preserving the storytelling it weights most. The deployed linear stepper is kept as a
   fallback. The statewide **coverage/scale grid is repurposed** into a real, actionable **Governance
   Inventory** (Craig flagged the 14k-empty grid as not making sense in an operational tool). → ADR 0002.
10. **Governance Inventory + unified Review queue** (resolves the coverage-map concerns):
   - Matrix → **tree** (Government Unit → Office → Core Function → Transaction → Record) — faithful to the
     bounty's own hierarchy; shows only **entity-type-applicable functions** (no school-district marriage
     licenses / death certificates).
   - Humans never review cell-by-cell. **Agents do the volume; the Review queue surfaces exceptions.**
   - **One queue, three sources:** QA flags (from generation), legislative-change diffs, and
     cross-jurisdiction **consistency findings**. Each item carries a `type` and drills into the right
     detail view (model build / Versions / Compare).
   - The **Consistency Scan is a queue action** ("Run scan"), **not a first-class view** — it bulk-flags
     inconsistencies across jurisdictions into the queue (equal-rights detection *at scale*).
   - **In-generation conflicts resolve inline** via a modal (e.g., Records vs Data Minimization on the
     SSN, citing §81-2-303(4)) so the officer never leaves the build → publishes in-context. The queue
     is reserved for asynchronous sources (legislative changes, cross-jurisdiction findings).
   - **Public-records release / redaction** is a first-class view: the Redaction Agent shows the
     public-release copy with DOB/address/SSN withheld + citations (extra-points workflow).

## SEDI / KERI (glossary, for the bonus layer)
- **KERI** — Key Event Receipt Infrastructure (Samuel M. Smith): decentralized identity rooted in
  self-certifying identifiers + verifiable key-event logs, no central registry. **ACDC** = its
  verifiable-credential format.
- **SEDI** — State-Endorsed Digital Identity: state endorsement over a citizen-held verifiable credential.
- **Bridge to our bounty** — SEDI lets a citizen *prove a claim* (e.g., "over 18", "identity verified")
  so government collects the **minimum** data and never stores raw PII. Realizes our **data-minimization**
  principle and advances **equal data rights** (identity is citizen-controlled + portable across entities).
