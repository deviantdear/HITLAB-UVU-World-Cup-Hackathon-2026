"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GovernanceModel } from "@/lib/governanceModel";
import type { ReplayFieldState, ReplayState } from "@/hooks/useReplay";
import { FIELD_ORDER, FIELD_LABEL, getFieldByPath } from "@/lib/fields";
import { AGENT_LABEL } from "@/lib/agents";

function ConfidenceBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value < 0.75 ? "bg-amber-500" : "bg-emerald-500";
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-200">
        <span className={`block h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </span>
      <span className="text-[10px] tabular-nums text-slate-500">{pct}%</span>
    </span>
  );
}

function FieldCard({ field, model }: { field: ReplayFieldState; model: GovernanceModel }) {
  const authored = getFieldByPath(model, field.path);
  const flagged = field.status === "flagged";
  const reviewed = field.status === "approved" || field.status === "edited";
  const sedi = authored?.sediEnforcement;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={`rounded-lg border bg-white p-3 shadow-sm ${
        flagged ? "border-amber-400 ring-1 ring-amber-200" : "border-slate-200"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-semibold uppercase tracking-wide text-navy">
          {FIELD_LABEL[field.fieldKey]}
        </span>
        <ConfidenceBar value={field.confidence} />
      </div>

      <p className="mt-1.5 text-sm leading-snug text-slate-800">{field.value}</p>

      <div className="mt-2 flex flex-wrap items-center gap-1.5">
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600">
          {AGENT_LABEL[field.agent as keyof typeof AGENT_LABEL] ?? field.agent} Agent
        </span>
        {authored?.citations?.map((c) => (
          <span
            key={c.label}
            className="rounded bg-sky-50 px-1.5 py-0.5 text-[10px] font-medium text-sky-700"
          >
            {c.label}
          </span>
        ))}
      </div>

      <AnimatePresence>
        {flagged && field.flagReason ? (
          <motion.div
            key="flag"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-md bg-amber-50 px-2.5 py-1.5 text-[11px] text-amber-800"
          >
            <span className="font-semibold">⚠ Flagged by QA for human review:</span> {field.flagReason}
          </motion.div>
        ) : null}
        {reviewed ? (
          <motion.div
            key="review"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-md bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800"
          >
            <span className="font-semibold">✓ {field.status === "edited" ? "Edited & approved" : "Approved"}</span>
            {field.reviewedBy ? ` by ${field.reviewedBy}` : ""}
          </motion.div>
        ) : null}
        {reviewed && sedi?.applicable ? (
          <motion.div
            key="sedi"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2 rounded-md border border-violet-200 bg-violet-50 px-2.5 py-1.5 text-[11px] text-violet-800"
          >
            <span className="font-semibold">With SEDI / verifiable identity:</span> {sedi.note}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export function GovernanceModelPanel({
  state,
  model,
}: {
  state: ReplayState;
  model: GovernanceModel;
}) {
  const fieldsByKey = new Map(Object.values(state.fields).map((f) => [f.fieldKey, f]));
  const ordered = FIELD_ORDER.map((k) => fieldsByKey.get(k)).filter(
    (f): f is ReplayFieldState => Boolean(f),
  );
  const record = model.transactions[0]?.records[0];
  const published = state.publishedVersion != null;

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-bold tracking-tight text-navy">{model.title}</h2>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${
              published
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {published ? `Published v${state.publishedVersion}` : "Generating…"}
          </span>
        </div>
        <p className="mt-0.5 text-xs text-slate-500">
          {model.entityName} · {model.office} · {model.coreFunction} → {model.primaryDuty}
        </p>
        {record ? (
          <p className="mt-1 text-[11px] font-medium text-slate-400">
            Record: {record.name}
          </p>
        ) : null}
      </div>

      <div className="mt-3 flex-1 space-y-2 overflow-y-auto pr-1">
        {ordered.length === 0 ? (
          <p className="py-8 text-center text-sm text-slate-400">
            Press play — the agents will assemble this model field by field.
          </p>
        ) : (
          <AnimatePresence>
            {ordered.map((f) => (
              <FieldCard key={f.fieldKey} field={f} model={model} />
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
