"use client";

import { useState } from "react";

interface Row {
  label: string;
  uc: string;
  orem: string;
  diverge: boolean;
  fix?: string;
}

const COMPARE: Row[] = [
  { label: "Statutory Authority", uc: "Utah Code § 11-12-101", orem: "Utah Code § 11-12-101", diverge: false },
  { label: "Purpose of Processing", uc: "License issuance, renewal & enforcement", orem: "License issuance, renewal & enforcement", diverge: false },
  { label: "Owner SSN / EIN", uc: "Collected; classified Public", orem: "Collected; classified Private", diverge: true, fix: "Collected; classified Private" },
  { label: "Owner Home Address", uc: "Public", orem: "Private", diverge: true, fix: "Private" },
  { label: "Primary Classification", uc: "Public", orem: "Private", diverge: true, fix: "Private" },
  { label: "Retention Period", uc: "Permanent", orem: "5 years", diverge: true, fix: "7 years" },
];

function cellClass(unequal: boolean) {
  return `rounded-lg border p-2.5 text-[13px] leading-snug ${
    unequal ? "border-amber-300 bg-amber-50 text-amber-900" : "border-slate-200 bg-white text-slate-700"
  }`;
}

function Marker({ unequal }: { unequal: boolean }) {
  return (
    <span
      className={`grid h-6 w-6 place-items-center rounded-full text-xs font-bold ${
        unequal ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
      }`}
    >
      {unequal ? "≠" : "="}
    </span>
  );
}

export function ComparisonView() {
  const [harmonized, setHarmonized] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const inconsistencies = COMPARE.filter((r) => r.diverge).length;

  return (
    <div className="mx-auto max-w-[1080px] px-6 pb-16 pt-7">
      <header className="mb-4 flex items-center justify-between gap-5">
        <div className="max-w-[600px]">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">Across jurisdictions</div>
          <h2 className="text-balance font-display text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-slate-900">
            Same data. Unequal rights.
          </h2>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/Privacy-Exchange.png" alt="" className="hidden h-auto w-[120px] flex-none sm:block" />
      </header>

      {/* Banner */}
      {harmonized ? (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-4">
          <span className="text-xl">✓</span>
          <div>
            <div className="font-display text-[17px] font-extrabold text-emerald-700">
              Harmonized — equal rights restored
            </div>
            <div className="text-[12.5px] text-teal-700">
              Both entities now govern this record identically. <strong>0 inconsistencies.</strong>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-2 flex items-center gap-3 rounded-xl border border-amber-200 bg-orange-50 px-5 py-3.5">
          <span className="text-xl">⚠</span>
          <div className="text-[13.5px] text-amber-900">
            <strong>{inconsistencies} inconsistencies found</strong> between two entities governing the
            identical record.
          </div>
        </div>
      )}

      {/* Record label */}
      <div className="my-4 text-center text-[11px] font-bold uppercase tracking-[0.14em] text-slate-400">
        Business License · “Business License Application”
      </div>

      {/* Comparison table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-[1fr_40px_1fr] border-b border-slate-100 bg-slate-50/70 px-[18px] py-3.5">
          <div className="font-display text-[15px] font-extrabold text-slate-900">
            Utah County <span className="text-xs font-semibold text-slate-400">(unincorporated)</span>
          </div>
          <div />
          <div className="text-right font-display text-[15px] font-extrabold text-slate-900">Orem City</div>
        </div>
        <div className="px-[18px] pb-3.5 pt-1.5">
          {COMPARE.map((row) => {
            const fixedNow = harmonized && row.diverge;
            const unequal = row.diverge && !harmonized;
            const ucVal = fixedNow ? row.fix : row.uc;
            const oremVal = fixedNow ? row.fix : row.orem;
            return (
              <div key={row.label} className="border-b border-slate-100 py-2.5 last:border-0">
                <div className="mb-2 text-center text-[10.5px] font-bold uppercase tracking-[0.08em] text-slate-400">
                  {row.label}
                </div>
                <div className="grid grid-cols-[1fr_40px_1fr] items-center gap-2.5">
                  <div className={cellClass(unequal)}>{ucVal}</div>
                  <div className="flex justify-center">
                    <Marker unequal={unequal} />
                  </div>
                  <div className={`${cellClass(unequal)} text-right`}>{oremVal}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Harmonization recommendation */}
      <div className="mt-[18px] flex flex-wrap items-center gap-4 rounded-2xl bg-gradient-to-br from-navy to-navy-deep px-[22px] py-[18px] text-white shadow-lg">
        <div className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-white/10 text-xl">⚖</div>
        <div className="min-w-[260px] flex-1">
          <div className="mb-0.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-white/60">
            Harmonization Agent · recommendation
          </div>
          <div className="text-sm leading-relaxed text-white/90">
            Classify owner <strong>SSN / EIN as Private</strong> under{" "}
            <span className="font-mono text-[12.5px]">Utah Code § 63G-2-302</span> for both entities, and
            align <strong>retention to 7 years</strong>.
          </div>
        </div>
        {harmonized ? (
          <button
            onClick={() => setHarmonized(false)}
            className="flex-none rounded-[10px] border border-white/30 px-[18px] py-[13px] text-[13px] font-bold text-white hover:bg-white/10"
          >
            ↺ Reset demo
          </button>
        ) : dismissed ? (
          <div className="flex flex-none items-center gap-3">
            <span className="text-[12.5px] font-semibold text-white/80">Dismissed — flagged for policy review.</span>
            <button onClick={() => setDismissed(false)} className="rounded-[10px] border border-white/30 px-4 py-[11px] text-[13px] font-bold text-white hover:bg-white/10">Undo</button>
          </div>
        ) : (
          <div className="flex flex-none items-center gap-2">
            <button onClick={() => setDismissed(true)} className="rounded-[10px] border border-white/30 px-4 py-[13px] text-[13px] font-bold text-white hover:bg-white/10">Dismiss</button>
            <button onClick={() => setHarmonized(true)} className="rounded-[10px] bg-utah-orange px-[22px] py-[13px] font-display text-sm font-extrabold text-white hover:brightness-105">Apply to both →</button>
          </div>
        )}
      </div>

      <p className="mx-auto mt-5 max-w-[680px] text-center text-[13.5px] leading-relaxed text-slate-500">
        A citizen’s privacy shouldn’t depend on which office they walked into.
      </p>
    </div>
  );
}
