import { marriageLicenseRun } from "@/lib/data";
import { FIELD_ORDER, FIELD_LABEL } from "@/lib/fields";
import { AGENT_LABEL } from "@/lib/agents";
import type { AgentId } from "@/lib/governanceModel";

export function ModelDocumentView() {
  const model = marriageLicenseRun.model;
  const rec = model.transactions[0]?.records[0];

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          The governance model
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          One complete model, from unit to disposition.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The same structure as Utah&apos;s Marriage Model — produced and human-approved by the agents.
        </p>
      </header>

      <article className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Document header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-navy px-6 py-4 text-white">
          <div>
            <div className="font-display text-xl font-extrabold">{model.title}</div>
            <div className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-white/60">
              Data Governance Model
            </div>
          </div>
          <span className="rounded-full bg-emerald-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-emerald-950">
            Published v{model.version}
          </span>
        </div>

        {/* Breadcrumb hierarchy */}
        <div className="flex flex-wrap items-center gap-1.5 border-b border-slate-100 bg-slate-50 px-6 py-3 text-[11px] font-medium text-slate-500">
          {[
            model.governmentUnit,
            model.office,
            model.coreFunction,
            model.primaryDuty,
            model.transactions[0]?.name,
            rec?.name,
          ]
            .filter(Boolean)
            .map((seg, i, arr) => (
              <span key={`${seg}-${i}`} className="flex items-center gap-1.5">
                <span>{seg}</span>
                {i < arr.length - 1 ? <span className="text-slate-300">→</span> : null}
              </span>
            ))}
        </div>

        {/* Fields */}
        <div className="px-6">
          {FIELD_ORDER.map((key) => {
            const f = rec?.fields[key];
            if (!f) return null;
            return (
              <section key={key} className="border-b border-slate-100 py-3.5 last:border-0">
                <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-utah-orange">
                  {FIELD_LABEL[key]}
                </div>
                <p className="mt-1 text-sm leading-snug text-slate-800">{f.value}</p>
                <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                  <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                    {AGENT_LABEL[f.agent as AgentId] ?? f.agent} Agent
                  </span>
                  {f.citations.map((c) => (
                    <span
                      key={c.label}
                      className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-sky-700"
                    >
                      {c.label}
                    </span>
                  ))}
                  {f.reviewStatus === "approved" || f.reviewStatus === "edited" ? (
                    <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                      ✓ human-approved
                    </span>
                  ) : null}
                </div>
              </section>
            );
          })}
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-3 text-[11px] text-slate-500">
          Reviewed &amp; approved by <span className="font-semibold text-slate-700">Chris B., County Privacy Officer</span>.
        </div>
      </article>
    </div>
  );
}
