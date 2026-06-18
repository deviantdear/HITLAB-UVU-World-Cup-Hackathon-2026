# Claude Design prompts — all screens

How to use: **paste the STYLE HEADER first, then one SCREEN prompt** into each Claude Design
session. Generate them in the recommended order (matches our beat priority). Each screen is a
self-contained presentational React + Tailwind component we'll wire to live replay state after.

Recommended generation order: **3 → 4 → 6 → 2 → 1 → 7 → 8** (top demo beats first; #3 already
exists in code, so its prompt is for visual polish/reference).

---

## STYLE HEADER (prepend to every screen prompt)

```
Build a single self-contained React functional component (TypeScript) styled with Tailwind CSS v4
utility classes. Presentational only — accept data via typed props and include realistic inline
mock data for preview. No backend, no Next.js server code. Use lucide-react for icons and
framer-motion for subtle, purposeful motion. Optimize for a 1440×900 presentation display.

This is "Utah Data Governance — AI Agent Orchestration," a tool that shows how AI agents create and
maintain government data-governance models. Audience: policymakers, county/city officials, clerks,
privacy & records officers, and the public. Tone: trustworthy, calm, modern civic-tech — authoritative
but human, never flashy-startup and never bureaucratic-drab. Everything must be legible to a
non-technical legislator in seconds.

Design system:
- Colors: primary deep navy #0B3D6B, darker navy #082A4A; Utah accent orange #E8852B (use sparingly,
  for active/CTA/emphasis only); neutral slate grays; light gray #F4F5F7 page background; white cards.
  Status colors: emerald = done/approved, amber = flagged/needs human review, violet = SEDI/verifiable
  identity, sky = working/in-progress, slate = idle/not started.
- Typography: Geist Sans for UI; Geist Mono for citations, statute numbers, and version tags.
  Strong type hierarchy, generous whitespace.
- Components: rounded-xl white cards, soft shadows, 2px colored borders to signal status, pill badges,
  a subtle Utah beehive emblem motif where a logo fits.
- Accessibility: high contrast, clear focus states, real labels.
```

---

## Screen 1 — Opening / Title hero

```
Screen: the opening title + thesis for a 5-minute live demo.
- Big headline: "Equal Data Rights Under the Law." Subhead: "Today, the same personal information is
  governed differently depending on which government office collected it. AI agent orchestration can
  fix that — at the scale of every county, city, and agency in the state."
- A short "meet your guide" element: Chris B., a county privacy officer, who must bring thousands of
  government functions into compliance with a two-person team. One stat row: "1 governance model ≈
  weeks of analyst work · thousands of functions · today, almost none are fully modeled."
- A single primary CTA button: "Begin →".
- Visual: navy gradient background, subtle Utah map silhouette or beehive emblem, refined and civic.
```

## Screen 2 — Scale grid (the problem + scalability)

```
Screen: a matrix that makes the scale of the problem and the scalability of the solution visceral.
- Rows = government entities: Utah County (unincorporated), Orem City, Provo City, Salt Lake County,
  Alpine School District, Utah Dept. of Health & Human Services. Columns = functions: Marriage License,
  Business License, Dog License, Building Permit, Voter Registration, Death Certificate.
- Each cell is a status chip: "Published v1" (emerald, with a tiny version tag), "Generating…"
  (sky, animated pulse), or "Ready" (slate, empty — the default for most cells).
- Make MOST cells "Ready" (ungoverned) so the emptiness reads as the problem. Marriage License /
  Utah County = Published. One cell mid-"Generating".
- A header counter: "2 of 14,000+ governance models generated" with a thin progress bar at ~0%.
- Clicking a "Ready" cell should visually start generation (call an onGenerate(entity, fn) prop).
- Caption: "Each cell is a complete governance model. One orchestration run fills one cell in minutes."
```

## Screen 3 — Orchestration dashboard (polish of existing build)

```
Screen: the live "watch AI agents build a governance model" view. Two columns.
LEFT — an orchestration graph: a central navy "Orchestrator" node connected to 10 specialized agent
cards: Records, Legal Authority, Purpose, Use, Data Minimization, Classification, Retention,
Decision Point, Redaction, Quality Assurance. Each agent card shows its name, a one-line description,
and a status (idle / working / done / flagged) with a colored ring + status dot; edges animate when an
agent is working. Show a "7 / 10 agents complete" progress in the Orchestrator node.
RIGHT — the governance model assembling field-by-field for "Marriage License — Utah County · Clerk".
Each field card shows: field label (e.g. "Secondary Classification"), the produced value, a chip for
which agent produced it, citation chips (e.g. "Utah Code § 81-2-303"), and a confidence bar (amber if
< 75%, emerald otherwise). One field (the SSN / Secondary Classification) is flagged amber "Flagged by
QA for human review". A top bar has play / restart / speed (0.5× 1× 2×) controls and a timeline scrubber.
Make it feel like watching specialists collaborate in real time. Legible, calm, premium.
```

## Screen 4 — Human review gate (interactive — beat #2, our top priority)

```
Screen: the moment a human approves an AI recommendation. A focused review panel (modal or right-rail)
that appears when the QA agent flags a field.
- Header: "Human review required" with an amber accent and the reviewer identity: "Chris B., County
  Privacy Officer".
- Body: the flagged field — "Secondary Classification" of the Marriage License record. Show the AI's
  proposed value: "Exempt — Utah Code § 81-2-303(4): social security numbers may not be recorded on the
  marriage license but may be provided to DHHS or ORS for child support administration." Show the QA
  agent's flag reason: "SSN is the highest-sensitivity element and the §81-2-303(4) handling rule is
  nuanced. Confidence 71% — recommend human review before publish." Show citation chips and a confidence bar.
- Actions (primary, attributed to the human): "Approve", "Edit value", "Request changes". Approve is the
  prominent navy/orange CTA. On approve, show a satisfying emerald confirmation: "Approved by Chris B."
- The emotional point: a human holds final authority; the AI proposes, the officer disposes.
```

## Screen 5 — Governance model document view (the canonical artifact)

```
Screen: the finished, shareable governance model — should resemble an official Utah state document
(this mirrors the provided "Marriage Model" example judges have seen).
- Top: Utah beehive emblem, title "Marriage License — Data Governance Model", a "Published v1" badge,
  and a breadcrumb of the hierarchy: Government Unit (County) → Office (Clerk) → Core Function (Marriage
  Licenses) → Primary Duty (Issue License) → Transaction (Process application) → Record (Application for
  License to Marry).
- Body: a clean, print-friendly layout of the governance fields, each as a titled section with its value
  and citation: Personal Data in the Record; Use of Personal Data; Purpose of Processing; Statutory
  Authorization; Authority for Processing Personal Data; Value of the Record; Primary Classification;
  Secondary Classification; Retention & Disposition; Retention Period for Personal Data; General Retention
  Schedule (GRS-285). Use real values from a marriage license.
- Calm, authoritative, lots of whitespace; a "human-reviewed & approved by Chris B." stamp.
```

## Screen 6 — Equal data rights comparison (beat #3)

```
Screen: the policy heart of the demo — the same function governed differently by two entities.
- Two columns side by side: "Utah County (unincorporated)" vs "Orem City", both for the function
  "Business License", same record ("Business License Application").
- Align the governance fields row-by-row across the two columns. Where the two entities AGREE, render
  calmly; where they DIVERGE (e.g., Primary Classification, Retention period, whether owner address is
  public), HIGHLIGHT both sides in amber/orange with a small "≠" marker.
- A top banner: "⚠ Same personal data, unequal rights" and a count: "3 inconsistencies found".
- A recommendation card from a "Harmonization Agent": "Recommend classifying owner SSN/EIN as Private
  under Utah Code § 63G-2-302 for both entities, and aligning retention to 7 years." with an
  "Apply to both →" action.
- The takeaway a legislator should feel: a citizen's privacy shouldn't depend on which office they walked into.
```

## Screen 7 — Legislative change & version diff (beat #4 — maintenance)

```
Screen: models are living infrastructure that maintain themselves under human oversight.
- A "Legislative Monitor" alert banner: "New legislation detected — Utah H.B. ___ (ILLUSTRATIVE,
  for demo) — affects 2 fields in 1 model." (Clearly label hypothetical legislation as illustrative.)
- A version timeline: v1 (published) → v2 (proposed). 
- A diff view for each changed field: show BEFORE and AFTER side by side (e.g., Retention & Disposition:
  "Retain permanently" → "Retain 75 years, then transfer to Archives"), each with the agent that
  re-derived it and the triggering citation, plus a one-line rationale.
- A human action bar: "Approve update & publish v2" (navy/orange CTA), attributed to Chris B.
- Footer note: "AI agents continuously monitor Utah Code, federal law, and retention schedules and
  propose updates; a human approves every change."
```

## Screen 8 — SEDI / architecture coda (bonus tie-in)

```
Screen: the closing vision — how governance models connect to verifiable digital identity.
- A clean 3-layer architecture diagram (stacked or left-to-right):
  Layer 1 "Governance Models" (policy: what data, who may access, how long) →
  Layer 2 "SEDI / KERI — Verifiable Digital Identity" (the citizen proves a claim with a verifiable
  credential; minimal disclosure) →
  Layer 3 "Agentic Applications" (Healthcare Authorization, Public-Records Release, Privacy Notices).
- A "before / after" overlay using a real example — the marriage-license SSN:
  TODAY: "Clerk collects the SSN → stored in an exempt record → ongoing privacy & breach risk."
  WITH SEDI: "Citizen presents a verifiable credential to DHHS/ORS directly → the clerk never collects
  or stores the SSN → risk eliminated." Use violet accents for the SEDI side.
- Close with the thesis line: "Equal data rights under the law — at a scale humans can't reach alone."
```

---

## Optional (only if ahead of schedule)
- **Privacy Notice generator** — a screen that auto-drafts a plain-language data-collection privacy
  notice from the governance model (operationalizes the model; an "extra points" item).
- **Public-records release view** — the Redaction Agent showing a record as it would be released
  publicly, with redacted fields blacked out and the citation justifying each redaction.
