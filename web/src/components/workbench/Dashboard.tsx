"use client";

import {
  ACTIVITY,
  DASHBOARD,
  REVIEW_QUEUE,
  REVIEW_TYPE_LABEL,
  REVIEW_TYPE_STYLE,
  type ReviewItem,
  type WorkbenchView,
} from "@/lib/workbench";

function Kpi({ dot, label, value, sub, onClick }: { dot: string; label: string; value: string | number; sub: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-shadow hover:shadow-md">
      <div className="flex items-center gap-2 text-[11.5px] font-bold text-slate-500">
        <span className="h-2 w-2 rounded-full" style={{ background: dot }} />
        {label}
      </div>
      <div className="mt-2 font-display text-3xl font-extrabold leading-none text-slate-900">{value}</div>
      <div className="mt-1 text-[11.5px] text-slate-400">{sub}</div>
    </button>
  );
}

// 36-cell glance heat: 3 published, 2 in-review, rest ungoverned
const HEAT = Array.from({ length: 36 }, (_, i) =>
  i < 3 ? "#13DF81" : i < 5 ? "#E8852B" : "#E2E8F0",
);

export function Dashboard({
  reviewerName,
  reviewCount,
  onNavigate,
  onOpenItem,
}: {
  reviewerName: string;
  reviewCount: number;
  onNavigate: (v: WorkbenchView) => void;
  onOpenItem: (item: ReviewItem) => void;
}) {
  const firstName = reviewerName.split(/\s+/)[0] || "Chris";

  return (
    <div className="mx-auto max-w-[1180px] px-[30px] pb-16 pt-7">
      <div className="mb-5">
        <h1 className="font-display text-[26px] font-extrabold tracking-tight text-slate-900">
          Good morning, {firstName}.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Here&apos;s where governance stands across your jurisdictions.
        </p>
      </div>

      {/* KPI row */}
      <div className="mb-5 grid grid-cols-2 gap-3.5 md:grid-cols-4">
        <Kpi dot="#059669" label="Governed" value={DASHBOARD.governedCount.toLocaleString()} sub={`of ${DASHBOARD.statewideTotal.toLocaleString()}+ functions statewide`} onClick={() => onNavigate("models")} />
        <Kpi dot="#E8852B" label="Awaiting your review" value={reviewCount} sub="flagged items need a human" onClick={() => onNavigate("review")} />
        <Kpi dot="#0EA5E9" label="Generating now" value={DASHBOARD.generatingCount} sub="orchestration runs active" onClick={() => onNavigate("inventory")} />
        <Kpi dot="#D97706" label="Inconsistencies" value={4} sub="same data, unequal rights" onClick={() => onNavigate("compare")} />
      </div>

      <div className="grid grid-cols-1 items-start gap-[18px] lg:grid-cols-[1.55fr_1fr]">
        {/* Needs your attention */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-[18px] py-3.5">
            <div className="font-display text-[15px] font-extrabold text-slate-900">Needs your attention</div>
            <button onClick={() => onNavigate("review")} className="text-xs font-bold text-navy">View queue →</button>
          </div>
          <div className="p-2">
            {REVIEW_QUEUE.map((item) => (
              <button
                key={item.id}
                onClick={() => onOpenItem(item)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-display text-[13.5px] font-bold text-slate-900">
                    {item.functionName} <span className="text-xs font-semibold text-slate-400">· {item.entity}</span>
                  </div>
                  <div className="mt-0.5 truncate text-xs text-slate-500">{item.preview}</div>
                </div>
                <span className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${REVIEW_TYPE_STYLE[item.type]}`}>
                  {REVIEW_TYPE_LABEL[item.type]}
                </span>
                <span className="flex-none text-base text-slate-300">›</span>
              </button>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-[18px]">
          <div className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div className="font-display text-[15px] font-extrabold text-slate-900">Coverage at a glance</div>
              <button onClick={() => onNavigate("inventory")} className="text-xs font-bold text-navy">Open inventory →</button>
            </div>
            <div className="mb-2 flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold text-slate-900">{DASHBOARD.coveragePct}</span>
              <span className="text-xs text-slate-400">of sampled functions modeled</span>
            </div>
            <div className="mb-3 grid grid-cols-[repeat(18,1fr)] gap-[3px]">
              {HEAT.map((c, i) => (
                <span key={i} className="aspect-square rounded-[3px]" style={{ background: c }} />
              ))}
            </div>
            <div className="flex flex-wrap gap-3 text-[11px] text-slate-500">
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-emerald-400" />Published</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-utah-orange" />In review</span>
              <span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-[3px] bg-slate-200" />Ungoverned</span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-[18px] shadow-sm">
            <div className="mb-3 font-display text-[15px] font-extrabold text-slate-900">Recent activity</div>
            <div className="flex flex-col">
              {ACTIVITY.map((ev, i) => (
                <div key={i} className="flex gap-3 py-2">
                  <span className="mt-[5px] h-2 w-2 flex-none rounded-full" style={{ background: ev.dot }} />
                  <div className="flex-1">
                    <div className="text-[12.5px] leading-snug text-slate-700">{ev.text}</div>
                    <div className="mt-0.5 font-mono text-[11px] text-slate-400">{ev.when}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
