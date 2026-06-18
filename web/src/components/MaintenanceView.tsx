"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { MaintenanceUpdate } from "@/lib/maintenance";
import { AGENT_LABEL } from "@/lib/agents";

function VersionStep({ v, state }: { v: number; state: "published" | "proposed" | "current" }) {
  const styles =
    state === "published"
      ? "border-emerald-500 bg-emerald-50 text-emerald-700"
      : state === "proposed"
        ? "border-amber-400 bg-amber-50 text-amber-700"
        : "border-slate-300 bg-white text-slate-500";
  return (
    <div className={`rounded-lg border-2 px-3 py-1.5 text-sm font-bold ${styles}`}>
      v{v}
      <span className="ml-1.5 text-[10px] font-medium uppercase tracking-wide">{state}</span>
    </div>
  );
}

export function MaintenanceView({ update }: { update: MaintenanceUpdate }) {
  const [approved, setApproved] = useState(false);
  const { trigger, changes, fromVersion, toVersion, title, entityName } = update;

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          Living governance
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          The law changes. The model keeps up.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          AI agents continuously monitor the law and propose updates — a human approves every change.
        </p>
      </header>

      {/* Legislative monitor alert */}
      <div className="mb-4 rounded-lg border border-sky-300 bg-sky-50 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-sky-600 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white">
            Legislative monitor
          </span>
          {trigger.illustrative ? (
            <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-600">
              Illustrative
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-sky-900">
          <span className="font-semibold">New legislation detected — {trigger.label}.</span>{" "}
          {trigger.summary} Detected by the{" "}
          {AGENT_LABEL[trigger.detectedBy]} Agent — affects {changes.length} field
          {changes.length === 1 ? "" : "s"} in this model.
        </p>
      </div>

      {/* Version timeline */}
      <div className="mb-4 flex items-center gap-3">
        <VersionStep v={fromVersion} state="published" />
        <span className="text-slate-400">→</span>
        <VersionStep v={toVersion} state={approved ? "published" : "proposed"} />
      </div>

      {/* Proposed diffs */}
      <div className="space-y-3">
        {changes.map((c) => (
          <div key={c.fieldKey} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-navy">
                {c.label}
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
                {AGENT_LABEL[c.agent]} Agent
              </span>
              <span className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium text-sky-700">
                {c.citation.label}
              </span>
            </div>

            <div className="mt-2 grid grid-cols-[1fr_auto_1fr] items-stretch gap-2">
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-sm text-rose-900/80 line-through decoration-rose-400/60">
                {c.before}
              </div>
              <div className="flex items-center text-slate-400">→</div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-2.5 text-sm text-emerald-900">
                {c.after}
              </div>
            </div>

            <p className="mt-2 text-[11px] italic text-slate-500">Why: {c.rationale}</p>
          </div>
        ))}
      </div>

      {/* Human approval */}
      <div className="mt-4">
        {approved ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
          >
            ✓ Published v{toVersion} — approved by Chris B., County Privacy Officer. The model is now
            current with {trigger.label}.
          </motion.div>
        ) : (
          <div className="flex items-center justify-between gap-4 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
            <p className="text-sm text-amber-900">
              <span className="font-semibold">Human review required.</span> Approve the agent-proposed
              update to publish v{toVersion}.
            </p>
            <button
              onClick={() => setApproved(true)}
              className="shrink-0 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-deep"
            >
              ✓ Approve update &amp; publish v{toVersion} (as Chris B.)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
