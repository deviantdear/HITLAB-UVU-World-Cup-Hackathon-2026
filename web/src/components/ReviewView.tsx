"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { marriageLicenseRun } from "@/lib/data";

export function ReviewView() {
  const [approved, setApproved] = useState(false);
  const field = marriageLicenseRun.model.transactions[0]?.records[0]?.fields.secondaryClassification;
  const pct = Math.round((field?.confidence ?? 0) * 100);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          Human in the loop
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          A person has the final say.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          The agents propose; an accountable officer reviews anything sensitive before it is published.
        </p>
      </header>

      <div className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-amber-300 bg-white shadow-sm">
        <div className="flex items-center gap-2 border-b border-amber-200 bg-amber-50 px-5 py-3">
          <span className="grid h-6 w-6 place-items-center rounded-full bg-amber-400 text-xs font-bold text-amber-950">
            !
          </span>
          <span className="text-sm font-bold text-amber-900">Flagged by the Quality Assurance Agent</span>
          <span className="ml-auto font-mono text-[11px] text-amber-700">confidence {pct}%</span>
        </div>

        <div className="px-5 py-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
            Secondary Classification · Social Security Number
          </div>
          <p className="mt-1.5 text-sm leading-snug text-slate-800">{field?.value}</p>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {field?.citations.map((c) => (
              <span key={c.label} className="rounded bg-sky-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-sky-700">
                {c.label}
              </span>
            ))}
          </div>

          {field?.note ? (
            <div className="mt-3 rounded-md bg-slate-50 px-3 py-2 text-[12px] text-slate-600">
              <span className="font-semibold text-slate-700">QA note:</span> {field.note}
            </div>
          ) : null}

          {/* Confidence bar */}
          <div className="mt-3 flex items-center gap-2">
            <span className="h-1.5 w-40 overflow-hidden rounded-full bg-slate-200">
              <span className="block h-full rounded-full bg-amber-500" style={{ width: `${pct}%` }} />
            </span>
            <span className="text-[11px] text-slate-500">below the 75% auto-publish threshold</span>
          </div>
        </div>

        <div className="border-t border-slate-200 px-5 py-4">
          {approved ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
            >
              ✓ Approved by Chris B., County Privacy Officer — the model can now be published.
            </motion.div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setApproved(true)}
                className="rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-deep"
              >
                ✓ Approve as Chris B.
              </button>
              <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Edit value
              </button>
              <button className="rounded-full border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100">
                Request changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
