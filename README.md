# Utah Data Governance — AI Agent Orchestration

> **Equal data rights under the law — at a scale humans can't reach alone.**
>
> A working demonstration of how AI agent orchestration can **create and maintain** comprehensive data
> governance models across every county, city, and agency in a state — with a human always in the loop.

**🔗 Live demo:** https://hitlab-uvu-world-cup-hackathon-2026.vercel.app

Built for the **HITLAB × UVU World Cup Hackathon 2026** — County Data Governance Model Orchestration
bounty, sponsored by the **Utah Office of Data Privacy** and the **Gary R. Herbert Institute for
Public Policy (UVU)**.

---

## The problem

Government collects enormous amounts of personal data, but most entities have no comprehensive
*governance model* answering: what data is collected, why, under what legal authority, how it's
classified, who may access it, how long it's kept, and what must be redacted before public release.

As a result, **the same information is governed differently depending on which office collected it** —
unequal privacy protections for identical data. Modeling one government function by hand takes a
records analyst weeks; there are tens of thousands of functions statewide.

## What we built: the Privacy Workbench

Not a slideshow — **the operational console a county privacy officer (Chris B.) actually works in.**
The live demo is a single application with a sidebar; the pitch is a scripted walk through her workday.
The bounty frames these models as *operational governance infrastructure*, so we built the tool, not a
deck about the tool.

| Workbench screen | What it demonstrates |
| --- | --- |
| **Dashboard** | The whole program at a glance — functions governed, items awaiting a human, runs in progress, inconsistencies found. |
| **Generate a model** | 10 specialized agents (Legal Authority, Classification, Retention, Data Minimization, …) read real Utah statutes and build a Marriage License model **live**, each field with citations + a confidence score. When the Records and Data Minimization agents conflict over the SSN, the build **stops and asks the officer** — she resolves it inline, and only then does it publish. *The AI proposes; the officer disposes.* |
| **Published models** | The finished, citation-backed governance model — the same structure as Utah's own Marriage Model. |
| **Governance inventory** | The statewide scope, as a tree (unit type → office → function → record) keyed to what each entity type actually does — not a 14,000-cell grid a human clicks one by one. |
| **Review queue + Consistency scan** | Every exception — flagged field, legal change, cross-jurisdiction conflict — routes to one human queue. One **consistency scan** compares a record type across *every* Utah jurisdiction at once and bulk-flags the inconsistencies. |
| **Equal data rights** | The same Business License governed by **Utah County vs. Orem City** — identical personal data, divergent classification/retention. An agent flags the inequality and harmonizes it with one click. |
| **Version history** | New legislation is detected; agents propose a field-level diff; the officer **approves, edits, or rejects** → v2 published. Models are living infrastructure. |
| **Public records** | When the public requests a record, the Redaction agent applies the model automatically — DOB, address, SSN blacked out, each with its governing citation. |
| **SEDI identity** | How governance models (policy) connect to **verifiable digital identity** (SEDI/KERI) so government collects the *minimum* data — eliminating risk entirely (e.g. the marriage-license SSN). |

The full presenter walkthrough is in **[docs/SCRIPT.md](docs/SCRIPT.md)**.

### Design principles
- **Human-in-the-loop.** Every sensitive recommendation — and every inter-agent conflict — is gated on a human decision.
- **Provenance everywhere.** Every field records which agent produced it, what it cited, and a confidence score.
- **Demo-safe.** The orchestration replays a recorded event log, so the live demo never depends on a cold API call.

## How it maps to the bounty

- **Agent orchestration** → the *Generate a model* run: 10 specialized agents coordinated to assemble one cited model.
- **Maintenance at scale** → *Version history* (legislative change → diff → human approval) + the *Consistency scan*.
- **Human oversight** (extra-points) → the unified *Review queue* and the inline conflict gate.
- **Equal data rights** → the cross-jurisdiction comparison, surfaced automatically and harmonized.
- **Scalability** → one pipeline drives the whole *Governance inventory*; humans work only the exceptions.

A candid architecture and total-cost-of-ownership analysis — including why a human-supervised system is
the right *first* commitment for a public body and how full agentic autonomy is a costed, gated upgrade —
is in **[/presentations](presentations)**, alongside the node-based graph schema and the build roadmap.

## Architecture

```
shared/governanceModel.ts   ← the frozen schema contract (GovernanceModel + Field + GoldenRun + events)
data/                       ← curated golden-run outputs the demo replays ({events, model} per run)
web/                        ← Next.js 16 + React 19 + Tailwind v4 frontend — this is the demo
presentations/              ← engine architecture, cost analysis, graph schema, build roadmap (docs)
img/                        ← architecture & graph-schema diagrams
```

Engine and frontend are decoupled by the schema: the orchestration engine emits a `GoldenRun`
(`{ events, model }`); the frontend **replays** the event log to animate the agents and assemble the
model field-by-field. Every field carries its own provenance (agent, citations, confidence, review
status), so the orchestration view, the human-review gate, the version diff, and the equal-rights
comparison are all just different projections of one frozen contract — see
[docs/adr/0001-per-field-provenance-schema.md](docs/adr/0001-per-field-provenance-schema.md). The
decision to present this as an operational workbench is recorded in
[docs/adr/0002-workbench-operational-framing.md](docs/adr/0002-workbench-operational-framing.md);
[CONTEXT.md](CONTEXT.md) holds the domain glossary.

**Tech:** Next.js (App Router) · React Flow (orchestration graph) · Framer Motion · Tailwind v4 ·
Anthropic Claude API · deployed on Vercel.

## Run locally

```bash
cd web
npm install
npm run dev            # http://localhost:3000  (the Workbench)
npm run sync:contract  # re-pull the schema + golden runs from /shared and /data
```

A linear, click-through version of the same beats is also served at **`/presentation`** as an on-stage fallback.

## What's real vs. illustrative

We are careful not to present invented law as real:

- The **marriage-license** model uses validated ground-truth data, and its statute citations
  (e.g. Utah Code § 81-2-303(4), § 63G-2-302) are **accurate**.
- The **business-license** comparison values and the **maintenance bill** ("H.B. 412") are **clearly
  labeled illustrative**, chosen to demonstrate the mechanism.
- The demo **replays curated golden-run data** committed in `/data`; the orchestration engine that
  produces such runs is documented in [/presentations](presentations).

## Team

| Name | Role | GitHub |
| ---- | ---- | ------ |
| Craig Cossairt | Frontend & demo (the Workbench) | [@craigcossairt](https://github.com/craigcossairt) |
| Valerie Adams | Agent orchestration engine & architecture | [@deviantdear](https://github.com/deviantdear) |

## License

Released under the [MIT License](LICENSE).
