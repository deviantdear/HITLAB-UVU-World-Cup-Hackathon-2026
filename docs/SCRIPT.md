# 5-Minute Demo Script

**Live demo:** https://hitlab-uvu-world-cup-hackathon-2026.vercel.app
**Driver:** advance with the `›` button (top-right) or the numbered tabs. Each beat below lists what to
**SAY** and what to **DO**. The orchestration replays a recorded run — it will not fail on stage.

> Framing in one line, if asked before you start: *"We built a working demonstration of how AI agents
> can create and maintain a complete data-governance model for any government function — with a human
> always making the final call."*

---

### 0:00 — Title  ·  *(Step 01)*
**SAY:** "Today, the same personal information is governed differently depending on which government
office collected it. Your privacy shouldn't depend on which counter you walked up to. Meet Chris B. —
a county privacy officer who has to bring *thousands* of government functions into compliance, with a
two-person team. Modeling *one* function by hand takes weeks. Watch what orchestration does instead."
**DO:** Click **Begin**.

### 0:25 — Scale  ·  *(Step 02)*
**SAY:** "Every cell here is a complete governance model for one entity and one function. Almost all of
them are empty — ungoverned. That emptiness *is* the problem. Each one used to take an analyst weeks."
**DO:** Click any **+ Generate** cell — it fills in seconds. "One orchestration run fills one cell."

### 0:55 — Orchestration  ·  *(Step 03)*  ← the core
**SAY:** "Here's a real run for a marriage license. Ten specialized agents — Legal Authority,
Classification, Retention, and so on — each read the actual Utah statutes and fill in their piece, with
a citation and a confidence score. This is the hard, expert work, done in seconds instead of weeks."
**DO:** Press **Play**. Let the agents light up and the model assemble. When the amber **review banner**
appears, pause and say: "But notice — the Quality Assurance agent flagged something."

### 1:55 — Review  ·  *(Step 04)*  ← your highest-value beat
**SAY:** "The Social Security Number classification came back at 71% confidence — below our threshold.
The AI does **not** publish it. It stops and asks a human. The agents propose; the officer disposes."
**DO:** Click **✓ Approve as Chris B.** "Now — and only now — it publishes."

### 2:25 — Model  ·  *(Step 05)*
**SAY:** "Here's the finished governance model — every field cited, human-approved. Same structure as
Utah's own Marriage Model, produced and maintained by the system."
**DO:** Scroll briefly so they see it's complete, top to bottom.

### 2:50 — Equal Rights  ·  *(Step 06)*  ← the policy heart
**SAY:** "Now the point. Here's the *same* business license, governed by Utah County versus Orem City —
same owner, same data. But look: the SSN is public in one and private in the other. Home address,
classification, retention — four inconsistencies, for identical information. That's unequal data rights,
made visible. And an agent can fix it."
**DO:** Click **Apply to both →**. The banner turns green — "Zero inconsistencies. Equal rights, restored."

### 3:40 — Versioning  ·  *(Step 07)*
**SAY:** "These aren't static documents — they're living. When a new law passes, a monitor agent detects
it, the right agents re-derive only the affected fields, and they show the exact before-and-after diff.
A human still signs off on every change."
**DO:** Click **Approve update & publish v2**. "Version two, published — under Chris B.'s sign-off."

### 4:15 — SEDI  ·  *(Step 08)*  ← the close
**SAY:** "And here's where it goes. Governance models are the policy layer. Verifiable digital identity —
SEDI — is the enforcement layer: the citizen proves a claim without handing over the raw data. Watch the
marriage-license SSN."
**DO:** Toggle **Today** → **With SEDI**. "Today, the clerk stores the SSN — a standing honeypot. With
SEDI, the clerk never collects it. The data government never holds can never leak."
**SAY (close):** "Equal data rights under the law — at a scale humans can't reach alone. That's the
vision, and you just watched a working piece of it."

---

## If you only have 30 seconds
"Government collects huge amounts of personal data but rarely governs it consistently — your privacy
depends on which office you used. We built AI agents that read the actual law and produce a complete,
cited governance model for any function in seconds, flag the sensitive calls for a human to approve,
keep the model current as laws change, and surface where two entities treat identical data unequally —
then harmonize it. All at a scale no records team could reach by hand."

## Judge Q&A — quick answers
- **Is the AI real?** Yes — real Claude agents generate the fields from curated Utah statutes. We replay
  a recorded run on stage so it's reliable, but the engine genuinely produces this.
- **How do you handle hallucination / accuracy?** Every field carries a confidence score and citations;
  anything below threshold is **gated on a human**. The QA agent exists to route uncertainty to people.
- **How is this different from a retention schedule?** Retention is *one* of eleven governance
  practices here — we also cover legal authority, classification, minimization, redaction, and more.
- **How does it scale?** One run produces one model; the grid shows tens of thousands of entity ×
  function combinations the same pipeline can fill.
- **How is it maintained?** The Versioning step: legislative change → agent-proposed diff → human
  approval → new version. Models stay current automatically, with oversight.
- **What's illustrative vs. real?** Marriage-license data is validated against Utah's Marriage Model.
  Statute citations (§81-2-303, §63G-2-302) are real. The business-license comparison values and the
  "H.B. ___" maintenance bill are clearly labeled illustrative.

## Demo-safety
- The orchestration **replays a recorded log** — no live API call is needed; it can't fail mid-demo.
- Works offline from static data. Have the live URL **and** a local `npm run dev` ready as backups.
- (Recommended) keep a screen recording of one perfect run on the laptop as the ultimate fallback.
