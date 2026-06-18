# Utah Data Governance — AI Agent Orchestration

> **Equal data rights under the law — at a scale humans can't reach alone.**
>
> A demonstration of how AI agent orchestration can **create and maintain** comprehensive data
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

## What this demonstrates

A guided, policymaker-legible walkthrough (a sticky numbered stepper — use the `›` button or the
tabs) of an **AI agent orchestration** that does this work at scale:

| Step | What you see |
| --- | --- |
| **Title** | The thesis and the human at the center — Chris B., a county privacy officer. |
| **Scale** | An entity × function grid: almost everything is ungoverned. Click a cell to generate. |
| **Orchestration** | 10 specialized agents (Legal Authority, Classification, Retention, …) read real Utah statutes and build a Marriage License model **live**, field by field, each with citations + a confidence score. |
| **Review** | The QA agent flags the SSN classification; **a human approves before publish** — the AI proposes, the officer disposes. |
| **Model** | The finished, citation-backed governance model — the same structure as Utah's Marriage Model. |
| **Equal Rights** | The same Business License governed by **Utah County vs. Orem City** — identical personal data, divergent classification/retention. An agent flags the inequality and recommends harmonization. |
| **Maintenance** | New legislation is detected; agents propose a field-level diff; a human approves → **v2 published**. Models are living infrastructure. |
| **SEDI** | How governance models (policy) connect to **verifiable digital identity** (SEDI/KERI) so government collects the *minimum* data — eliminating risk entirely (e.g., the marriage-license SSN). |

### Design principles
- **Human-in-the-loop.** Every sensitive recommendation is gated on a human approval.
- **Provenance everywhere.** Every field records which agent produced it, what it cited, and a confidence score.
- **Demo-safe.** The orchestration replays a recorded event log, so the live demo never depends on a cold API call.

## Architecture

```
/shared/governanceModel.ts   ← the frozen schema contract (GovernanceModel + GoldenRun + events)
/engine                      ← agent orchestration (TypeScript, Claude API) — emits {model, events}
/web                         ← Next.js 16 + React 19 + Tailwind v4 frontend (this is the demo)
/data                        ← curated source corpus + committed "golden run" outputs
```

The engine and frontend are decoupled by the schema: the engine emits a `GoldenRun`
(`{ events, model }`); the frontend **replays** the event log to animate the agents and assemble
the model. See [CONTEXT.md](CONTEXT.md) for the domain model and [docs/PLAN.md](docs/PLAN.md) for
the build plan, and [docs/adr/0001-per-field-provenance-schema.md](docs/adr/0001-per-field-provenance-schema.md)
for the key design decision.

**Tech:** Next.js (App Router) · React Flow (orchestration graph) · Framer Motion · Tailwind v4 ·
Anthropic Claude API · deployed on Vercel.

## Run locally

```bash
cd web
npm install
npm run dev          # http://localhost:3000
npm run sync:contract  # re-pull the schema + golden runs from /shared and /data
```

## Status & honesty notes

- This is a **prototype**: the marriage-license model uses validated ground-truth data; the
  business-license comparison and the maintenance "Utah H.B. 412" are **clearly labeled illustrative**
  (real statute citations such as Utah Code § 81-2-303 and § 63G-2-302 are accurate).
- Sample "golden run" data ships in `/data`; the live engine output swaps in via `npm run sync:contract`.
- _This README will evolve as the engine integration lands._

## Team

| Name | Role | GitHub |
| ---- | ---- | ------ |
| Craig Cossairt | Frontend & demo | [@craigcossairt](https://github.com/craigcossairt) |
| Valerie Adams | Agent orchestration engine | — |

## License

Released under the [MIT License](LICENSE).
