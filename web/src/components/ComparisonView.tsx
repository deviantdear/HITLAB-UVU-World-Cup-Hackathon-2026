import type { ComparisonSet } from "@/lib/comparison";
import type { GovernanceModel } from "@/lib/governanceModel";
import { FIELD_ORDER, FIELD_LABEL } from "@/lib/fields";

function record(m: GovernanceModel) {
  return m.transactions[0]?.records[0];
}

function EntityHeader({ m }: { m: GovernanceModel }) {
  return (
    <div className="rounded-lg bg-navy px-4 py-3 text-white">
      <div className="text-sm font-bold">{m.entityName}</div>
      <div className="text-[11px] text-white/70">
        {m.governmentUnit} · {m.office}
      </div>
    </div>
  );
}

export function ComparisonView({ comparison }: { comparison: ComparisonSet }) {
  const { left, right, inequalities, recommendation, title } = comparison;
  const leftRec = record(left);
  const rightRec = record(right);
  const ineq = new Set(inequalities);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          Equal data rights
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          Same data, unequal rights · {title}
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The same function and the same personal data — governed differently by two entities.
        </p>
      </header>

      {/* Inequality banner */}
      <div className="mb-4 flex items-center gap-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-amber-950">
          ≠
        </span>
        <p className="text-sm text-amber-900">
          <span className="font-semibold">Same personal data, unequal rights.</span>{" "}
          {inequalities.length} inconsistenc{inequalities.length === 1 ? "y" : "ies"} found between{" "}
          {left.entityName} and {right.entityName}.
        </p>
      </div>

      {/* Comparison grid */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="grid grid-cols-[200px_1fr_1fr] gap-3 border-b border-slate-200 p-3">
          <div />
          <EntityHeader m={left} />
          <EntityHeader m={right} />
        </div>

        {FIELD_ORDER.map((key) => {
          const l = leftRec?.fields[key];
          const r = rightRec?.fields[key];
          const unequal = ineq.has(key);
          return (
            <div
              key={key}
              className="grid grid-cols-[200px_1fr_1fr] gap-3 border-b border-slate-100 p-3 last:border-b-0"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-semibold uppercase tracking-wide text-navy">
                  {FIELD_LABEL[key]}
                </span>
                {unequal ? (
                  <span className="w-fit rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-700">
                    ≠ Unequal
                  </span>
                ) : null}
              </div>
              <ValueCell value={l?.value} unequal={unequal} />
              <ValueCell value={r?.value} unequal={unequal} />
            </div>
          );
        })}
      </div>

      {/* Harmonization recommendation */}
      <div className="mt-4 rounded-xl border-2 border-utah-orange/40 bg-utah-orange/5 p-4">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-utah-orange px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            {recommendation.title}
          </span>
        </div>
        <p className="mt-2 text-sm leading-snug text-slate-800">{recommendation.text}</p>
        <button className="mt-3 rounded-full bg-navy px-4 py-1.5 text-sm font-semibold text-white hover:bg-navy-deep">
          Apply to both entities →
        </button>
      </div>
    </div>
  );
}

function ValueCell({ value, unequal }: { value?: string; unequal: boolean }) {
  return (
    <div
      className={`rounded-lg border p-2.5 text-sm leading-snug ${
        unequal
          ? "border-amber-300 bg-amber-50 text-amber-900"
          : "border-slate-200 bg-white text-slate-700"
      }`}
    >
      {value ?? "—"}
    </div>
  );
}
