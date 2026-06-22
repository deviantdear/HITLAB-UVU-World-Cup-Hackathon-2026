"use client";

import { useState } from "react";

export type ResolutionId = "remove" | "keep";

interface Option {
  id: ResolutionId;
  title: string;
  recommended?: boolean;
  detail: string;
}

const OPTIONS: Option[] = [
  {
    id: "remove",
    title: "Remove SSN from the license record",
    recommended: true,
    detail: "Keep SSN only on the separate DHHS/ORS transmission. The license itself never stores it.",
  },
  {
    id: "keep",
    title: "Keep SSN & document a justification",
    detail: "Requires a legal exception on file. The flag stays on the model.",
  },
];

/** Human label for a chosen resolution — shared by every surface that resolves this flag. */
export const RESOLUTION_LABEL: Record<ResolutionId, string> = {
  remove: "SSN removed from the license record",
  keep: "SSN kept with a documented justification",
};

/**
 * The QA / data-minimization decision card — the single source of truth for how this flag
 * is presented and resolved. Rendered as an overlay during orchestration (ConflictModal) and
 * as a panel from the Review queue (ReviewView), so the two surfaces always match.
 */
export function ConflictDecision({ onApply }: { onApply: (id: ResolutionId) => void }) {
  const [selected, setSelected] = useState<ResolutionId>("remove");

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
      {/* Header */}
      <div className="flex items-center gap-3 bg-amber-50 px-5 py-4">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-utah-orange text-lg text-white">⚠</span>
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-utah-orange">Human review required</div>
          <div className="font-display text-lg font-extrabold tracking-tight text-slate-900">Data Minimization conflict</div>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <p className="text-sm leading-relaxed text-slate-700">
          The <strong>Records agent</strong> listed the couple&apos;s <strong>Social Security number</strong> in the
          collected data. The <strong>Data Minimization agent</strong> objects, citing the statute below.
        </p>

        <div className="mt-3 rounded-lg bg-slate-50 p-3">
          <div className="font-mono text-[11px] text-sky-700">Utah Code § 81-2-303(4)</div>
          <p className="mt-1 text-[12.5px] italic leading-snug text-slate-600">
            “Social security numbers may not be recorded on the marriage license, but may be provided to
            DHHS or ORS for the administration of child support services.”
          </p>
        </div>

        <div className="mb-2 mt-4 text-[10.5px] font-bold uppercase tracking-[0.12em] text-slate-400">Choose a resolution</div>
        <div className="flex flex-col gap-2">
          {OPTIONS.map((o) => {
            const on = selected === o.id;
            return (
              <button
                key={o.id}
                onClick={() => setSelected(o.id)}
                className={`flex items-start gap-3 rounded-xl border-2 p-3 text-left transition-colors ${
                  on ? "border-navy bg-navy/5" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className={`mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full border-2 ${on ? "border-navy bg-navy text-white" : "border-slate-300 text-transparent"}`}>
                  <span className="text-[11px] leading-none">✓</span>
                </span>
                <span className="flex-1">
                  <span className="text-[13.5px] font-bold text-slate-900">
                    {o.title}
                    {o.recommended ? <span className="ml-1.5 text-[12px] font-semibold text-utah-orange">· recommended</span> : null}
                  </span>
                  <span className="mt-0.5 block text-[12px] leading-snug text-slate-500">{o.detail}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => onApply(selected)}
          className="mt-4 w-full rounded-full bg-navy py-2.5 font-display text-sm font-bold text-white hover:bg-navy-deep"
        >
          Apply resolution
        </button>
      </div>
    </div>
  );
}

/** Inline overlay used during the live orchestration run. */
export function ConflictModal({ onApply }: { onApply: (id: ResolutionId) => void }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md">
        <ConflictDecision onApply={onApply} />
      </div>
    </div>
  );
}
