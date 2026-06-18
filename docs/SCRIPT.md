# 5-Minute Demo Script — the Privacy Workbench

**Live demo:** https://hitlab-uvu-world-cup-hackathon-2026.vercel.app

The demo is a working application — the **Utah Data Governance Privacy Workbench** — navigated the way a
county privacy officer would actually use it on a Tuesday morning. You drive it by **clicking the left
sidebar** and the on-screen buttons; each beat below lists what to **SAY** and what to **DO**. The
orchestration **replays a recorded run**, so it can't fail on stage.

> Framing in one line, if asked before you start: *"This is the tool a county privacy officer uses to
> bring thousands of government functions into compliance — AI agents do the reading, the officer makes
> every final call."*

You are **Chris B., County Privacy Officer** (shown in the sidebar). Start on the **Dashboard** (the
default screen at the live URL).

---

### 0:00 — Dashboard  ·  *the frame*
**SAY:** "This isn't a slide deck — it's the actual console a county privacy officer logs into. Chris B.
has to govern *thousands* of government functions with a two-person team. Up top: 1,284 functions
governed, a handful flagged for her review, three models generating right now, and the inconsistencies
the system has found. Modeling *one* function by hand used to take an analyst weeks. Watch what the
orchestration does instead."
**DO:** Let them take in the four KPIs and the "Needs your attention" list. Then click **+ Generate a
model** (top-right).

### 0:35 — Generate a model  ·  *the core — orchestration + human authority*
**SAY:** "Ten specialized agents — Legal Authority, Classification, Retention, Data Minimization, and so
on — each read the actual Utah statutes and fill in their piece of a Marriage License model, every field
with a citation and a confidence score. This is the expert work, done in seconds instead of weeks."
**DO:** The run **auto-plays** — let the agents light up and the model assemble field-by-field on the
right. In a moment the build **stops itself** and a modal appears.

**SAY (when the modal pops):** "And here's the whole point. The Records agent collected the couple's
Social Security number — but the Data Minimization agent objects, citing Utah Code § 81-2-303(4): SSNs
**may not** be recorded on the marriage license. The agents disagree, so the system does **not** decide.
It stops and asks a human."
**DO:** Leave the recommended option selected (**Remove SSN from the license record**) and click
**Apply resolution**. The banner turns green: *"Resolved — SSN removed. Model published v1 by Chris B."*
**SAY:** "The AI proposes; the officer disposes. Now — and only now — it publishes."

### 2:05 — Published model  ·  *the artifact*
**DO:** Click **View published model →**, then open the **Marriage License** card.
**SAY:** "Here's the finished governance model — every field cited, human-approved, the same structure as
Utah's own Marriage Model. This is the deliverable: not a document someone typed, but a living record the
system produced and a person signed."

### 2:25 — Review queue + Consistency scan  ·  *oversight at scale*
**DO:** Click **Review queue** in the sidebar. Click **Run consistency scan**.
**SAY:** "Chris doesn't inspect 14,000 functions one at a time. She runs a consistency scan — one pass
that compares a record type across *every* Utah jurisdiction at once and routes only the exceptions to
her."
**DO:** When the scan finishes, the cross-jurisdiction inconsistencies appear (e.g. *13 municipalities
classify SSN differently*). Click **Review →** on one of them.

### 3:00 — Equal data rights  ·  *the policy heart*
**SAY:** "This is what the scan found. The *same* Business License, governed by Utah County versus Orem
City — same owner, same data. But the SSN is private in one and public in the other; home address,
classification, retention — four inconsistencies, for identical information. That's unequal data rights,
made visible. Your privacy shouldn't depend on which counter you walked up to. And an agent can fix it."
**DO:** Click **Apply to both →**. The banner turns green — *"Harmonized — equal rights restored. 0
inconsistencies."*

### 3:40 — Version history  ·  *living infrastructure*
**DO:** Click **Version history** in the sidebar.
**SAY:** "These models aren't static. A monitor agent watches Utah Code, federal law, and the retention
schedules. When a new bill changes the rules, it flags only the affected models and shows the exact
before-and-after diff. A human still signs every change."
**DO:** Click **Approve & publish v2**. *"Version two, published — under Chris B.'s sign-off."*
*(If asked whether she can push back: point out the **Reject** and **Edit** buttons — the officer can
reject the change or edit the proposed values before publishing.)*

### 4:15 — SEDI identity  ·  *the close*
**DO:** Click **SEDI identity** in the sidebar. Toggle **Today** → **With SEDI**.
**SAY:** "And here's where it goes. Governance models are the policy layer — what data, who may access
it, how long. Verifiable digital identity, SEDI, is the enforcement layer. Today the clerk stores that
SSN — a standing honeypot. With SEDI, the citizen proves the claim directly to DHHS and the clerk never
collects it. The data government never holds can never leak."
**SAY (close):** "Equal data rights under the law — at a scale humans can't reach alone. You just watched
a working piece of it."

---

## Optional beat — Public records (only if ahead of time, ~20s)
**DO:** Click **Public records** in the sidebar; toggle **Public release** vs **Internal copy**.
**SAY:** "When the public requests this record, the Redaction agent applies the model automatically — DOB,
address, and SSN are blacked out, each with the citation that requires it. Governance isn't a binder on a
shelf; it's enforced at the moment of disclosure."

## If you only have 30 seconds
"Government collects huge amounts of personal data but rarely governs it consistently — your privacy
depends on which office you used. We built the console a privacy officer actually works in: AI agents
read the real law and produce a complete, cited governance model for any function in seconds, stop and
ask a human on the sensitive calls, scan every jurisdiction at once to surface where identical data is
treated unequally and harmonize it, and keep every model current as laws change — all at a scale no
records team could reach by hand."

## Trimming for time
- **Core (never cut):** Dashboard → Generate a model (the conflict + Apply resolution) → Equal data
  rights → SEDI close.
- **First to cut if long:** the Public records optional beat, then the Published-model detour (you can
  narrate the published banner without opening the document), then the Review-queue stop (jump straight
  to Equal data rights via the sidebar).

## Judge Q&A — quick answers
- **Is the AI real?** Yes — real Claude agents generate the fields from curated Utah statutes. We replay
  a recorded run on stage for reliability, but the engine genuinely produces this. The architecture and
  cost model are written up in [`/presentations`](../presentations).
- **How do you handle hallucination / accuracy?** Every field carries a confidence score and citations;
  anything below threshold, or any inter-agent conflict, is **gated on a human**. The conflict you saw is
  exactly that mechanism — uncertainty routed to a person.
- **How is this different from a retention schedule?** Retention is *one* of eleven governance practices
  here — we also cover legal authority, classification, minimization, redaction, decision points, and more.
- **How does it scale?** One run produces one model; the Governance Inventory and the consistency scan
  show the pipeline applied across every entity × function in the state, with humans working only the
  exceptions in the queue.
- **How is it maintained?** The Version history screen: legislative change → agent-proposed diff → human
  approval (or rejection/edit) → new published version, with a full audit trail.
- **What's illustrative vs. real?** The marriage-license data is validated against Utah's Marriage Model
  and the statute citations (§ 81-2-303, § 63G-2-302) are real. The business-license comparison values and
  the maintenance bill ("H.B. 412") are **clearly labeled illustrative** — we never present invented law
  as real.
- **Why a workbench instead of full autonomy?** Deliberate. The bounty frames these as *operational
  governance infrastructure* for a cash- and compliance-constrained public body. [`/presentations`](../presentations)
  lays out the honest trade-off: a human-supervised system first, full agentic autonomy as a costed,
  gated upgrade.

## Demo-safety
- The orchestration **replays a recorded log** — no live API call is needed; it can't fail mid-demo.
- Runs offline from static data. Have the live URL **and** a local `npm run dev` ready as backups.
- A linear, click-through version of the same beats survives at **`/presentation`** if the workbench ever
  misbehaves on stage.
- **Keep a screen recording of one perfect run on the laptop as the ultimate fallback.**
