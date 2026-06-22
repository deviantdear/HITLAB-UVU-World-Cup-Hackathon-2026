"use client";

import { useState } from "react";

interface Diff {
  label: string;
  before: string;
  after: string;
  agent: string;
  cite: string;
  why: string;
}

const DIFF: Diff[] = [
  {
    label: "Retention & Disposition",
    before: "Retain permanently in the office of the County Clerk.",
    after: "Retain 75 years, then transfer to the Utah State Archives.",
    agent: "Retention",
    cite: "Utah H.B. 412 (illustrative)",
    why: "New schedule caps active retention and routes long-term custody to Archives.",
  },
  {
    label: "Secondary Classification",
    before: "Exempt — SSN may not be recorded.",
    after: "Private — access limited to DHHS / ORS for child-support administration.",
    agent: "Classification",
    cite: "Utah Code § 81-2-303(4)",
    why: "Re-derived classification aligns access rules with the amended handling provision.",
  },
];

type Mode = "pending" | "editing" | "published" | "rejected";

export function MaintenanceView() {
  const [mode, setMode] = useState<Mode>("pending");
  const [afters, setAfters] = useState<string[]>(DIFF.map((d) => d.after));

  const v2Label = mode === "published" ? "Published ✓" : mode === "rejected" ? "Rejected" : "Proposed";

  return (
    <div className="mx-auto max-w-[980px] px-6 pb-16 pt-7">
      <div className="mb-[18px] flex items-center justify-between gap-5">
        <div className="max-w-[600px]">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">Living governance</div>
          <h2 className="text-balance font-display text-[clamp(24px,3vw,34px)] font-extrabold leading-tight tracking-tight text-slate-900">
            The law changes. The model keeps up.
          </h2>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/Laws-and-Regulations.png" alt="" className="hidden h-auto w-[120px] flex-none sm:block" />
      </div>

      {/* Legislative monitor alert */}
      <div className="mb-[22px] flex items-center gap-3 rounded-xl border border-violet-200 bg-violet-50 px-[18px] py-3.5">
        <div className="grid h-[38px] w-[38px] flex-none place-items-center rounded-[10px] bg-violet-600 text-lg text-white">📡</div>
        <div className="flex-1">
          <div className="font-display text-[15px] font-extrabold text-violet-800">
            New legislation detected — Utah H.B. 412{" "}
            <span className="ml-1 rounded-full bg-violet-100 px-2 py-0.5 align-middle text-[11px] font-bold text-violet-700">ILLUSTRATIVE</span>
          </div>
          <div className="text-[12.5px] text-violet-900/70">
            Affects <strong>2 fields</strong> in <strong>1 model</strong> — Marriage License, Utah County.
          </div>
        </div>
      </div>

      {/* Version timeline */}
      <div className="mb-[22px] flex items-center">
        <div className="flex items-center gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
          <div>
            <div className="font-display text-sm font-extrabold text-slate-900">v1</div>
            <div className="text-[10.5px] font-semibold text-emerald-700">Published</div>
          </div>
        </div>
        <div className="mx-1.5 h-0.5 flex-1" style={{ background: "repeating-linear-gradient(90deg,#CBD5E1 0 6px,transparent 6px 12px)" }} />
        <div className={`flex items-center gap-3 rounded-xl border-[1.5px] bg-white px-4 py-2.5 ${mode === "rejected" ? "border-slate-300" : "border-utah-orange"}`}>
          <span className={`h-2.5 w-2.5 rounded-full ${mode === "rejected" ? "bg-slate-400" : "bg-utah-orange"}`} />
          <div>
            <div className="font-display text-sm font-extrabold text-slate-900">v2</div>
            <div className={`text-[10.5px] font-semibold ${mode === "published" ? "text-emerald-700" : mode === "rejected" ? "text-slate-500" : "text-amber-700"}`}>{v2Label}</div>
          </div>
        </div>
      </div>

      {/* Diffs */}
      <div className="flex flex-col gap-4">
        {DIFF.map((d, i) => (
          <div key={d.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-slate-100 bg-slate-50/70 px-[18px] py-3">
              <span className="font-display text-[15px] font-extrabold text-slate-900">{d.label}</span>
              <span className="flex items-center gap-2">
                <span className="rounded-full bg-slate-100 px-2.5 py-[3px] text-[10.5px] font-semibold text-slate-600">Re-derived by {d.agent} Agent</span>
                <span className="rounded-md bg-violet-50 px-2 py-[3px] font-mono text-[10.5px] text-violet-700">{d.cite}</span>
              </span>
            </div>
            <div className="grid grid-cols-[1fr_36px_1fr] items-stretch">
              <div className="px-[18px] py-[15px]">
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-slate-400">Before · v1</div>
                <div className="text-[13px] leading-relaxed text-slate-500 line-through decoration-rose-300">{d.before}</div>
              </div>
              <div className="flex items-center justify-center bg-slate-50 text-lg text-slate-300">→</div>
              <div className="bg-emerald-50/40 px-[18px] py-[15px]">
                <div className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-emerald-600">After · v2</div>
                {mode === "editing" ? (
                  <textarea
                    value={afters[i]}
                    onChange={(e) => setAfters((prev) => prev.map((a, j) => (j === i ? e.target.value : a)))}
                    rows={2}
                    className="w-full rounded-md border border-emerald-300 bg-white px-2 py-1.5 text-[13px] leading-relaxed text-slate-800 outline-none focus:border-emerald-500"
                  />
                ) : (
                  <div className="text-[13px] font-semibold leading-relaxed text-slate-800">{afters[i]}</div>
                )}
              </div>
            </div>
            <div className="border-t border-slate-100 px-[18px] py-2.5 text-[12px] leading-snug text-slate-500">
              <strong className="text-slate-600">Rationale:</strong> {d.why}
            </div>
          </div>
        ))}
      </div>

      {/* Human action bar */}
      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-[19px] py-[15px]">
        <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-gradient-to-br from-utah-orange to-utah-orange-deep font-display text-[13px] font-extrabold text-white">CB</span>
        <div className="min-w-[180px] flex-1 text-[13px] text-slate-600">
          A human holds final authority — <strong className="text-slate-800">Chris B.</strong> may approve, edit, or reject this update.
        </div>

        {mode === "pending" ? (
          <div className="flex flex-none items-center gap-2">
            <button onClick={() => setMode("rejected")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Reject</button>
            <button onClick={() => setMode("editing")} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Edit</button>
            <button onClick={() => setMode("published")} className="rounded-full bg-navy px-5 py-2 font-display text-sm font-bold text-white hover:bg-navy-deep">Approve &amp; publish v2</button>
          </div>
        ) : mode === "editing" ? (
          <div className="flex flex-none items-center gap-2">
            <button onClick={() => { setAfters(DIFF.map((d) => d.after)); setMode("pending"); }} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</button>
            <button onClick={() => setMode("published")} className="rounded-full bg-navy px-5 py-2 font-display text-sm font-bold text-white hover:bg-navy-deep">Save &amp; publish v2</button>
          </div>
        ) : mode === "published" ? (
          <div className="flex flex-none items-center gap-3">
            <span className="font-display text-sm font-extrabold text-emerald-700">✓ v2 published by Chris B.</span>
            <button onClick={() => { setAfters(DIFF.map((d) => d.after)); setMode("pending"); }} className="rounded-[9px] border border-slate-300 px-3 py-1.5 text-[12.5px] font-semibold text-slate-500 hover:bg-slate-100">↺ Reset</button>
          </div>
        ) : (
          <div className="flex flex-none items-center gap-3">
            <span className="font-display text-sm font-extrabold text-slate-600">✕ Update rejected — model stays at v1</span>
            <button onClick={() => setMode("pending")} className="rounded-[9px] border border-slate-300 px-3 py-1.5 text-[12.5px] font-semibold text-slate-500 hover:bg-slate-100">↺ Reset</button>
          </div>
        )}
      </div>

      <p className="mt-[18px] max-w-[780px] text-[12.5px] leading-relaxed text-slate-400">
        AI agents continuously monitor Utah Code, federal law, and retention schedules and propose updates —
        a human approves every change. <em>Hypothetical legislation shown is illustrative for this demo.</em>
      </p>
    </div>
  );
}
