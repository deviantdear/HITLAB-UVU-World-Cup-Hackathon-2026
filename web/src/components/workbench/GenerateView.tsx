"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReplay, type ReplayGate } from "@/hooks/useReplay";
import { marriageLicenseRun } from "@/lib/data";
import { OrchestrationGraph } from "@/components/OrchestrationGraph";
import { GovernanceModelPanel } from "@/components/GovernanceModelPanel";
import { ReplayControls } from "@/components/ReplayControls";
import { ConflictModal, type ResolutionId } from "@/components/workbench/ConflictModal";

const RESOLUTION_LABEL: Record<ResolutionId, string> = {
  remove: "SSN removed from the license record",
  keep: "SSN kept with a documented justification",
};

/**
 * "Watch the agents build" flow. Runs the 10-agent orchestration live, pauses at the
 * inter-agent conflict, and lets the officer resolve it inline (no trip to the queue) → publishes.
 */
export function GenerateView({ onDone }: { onDone?: () => void }) {
  const gates = useMemo<ReplayGate[]>(() => {
    const flag = marriageLicenseRun.events.find((e) => e.type === "qa_flag");
    const review = marriageLicenseRun.events.find((e) => e.type === "human_review");
    if (flag && review) return [{ at: flag.t + 150, resumeAt: review.t + 100, label: "" }];
    return [];
  }, []);

  const replay = useReplay(marriageLicenseRun.events, { gates, autoPlay: true });
  const { state, pendingGate } = replay;
  const [resolution, setResolution] = useState<ResolutionId | null>(null);
  const published = state.publishedVersion != null;

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">Orchestration run</div>
          <h1 className="font-display text-lg font-extrabold tracking-tight text-navy">
            Generating: Marriage License · Utah County
          </h1>
        </div>
        <span className="rounded-full bg-utah-orange/10 px-3 py-1 text-xs font-semibold text-utah-orange">
          10 specialized agents
        </span>
      </div>

      <div className="border-b border-slate-200 bg-white px-6 py-2.5">
        <ReplayControls replay={replay} />
      </div>

      {/* Resolved → published confirmation (inline, no queue trip) */}
      <AnimatePresence>
        {published && resolution ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between gap-4 border-b border-emerald-300 bg-emerald-50 px-6 py-3"
          >
            <p className="text-sm text-emerald-900">
              <span className="font-semibold">✓ Resolved — {RESOLUTION_LABEL[resolution]}.</span> Model published v
              {state.publishedVersion} by Chris B.
            </p>
            {onDone ? (
              <button onClick={onDone} className="shrink-0 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-deep">
                View published model →
              </button>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="grid h-[calc(100vh-242px)] min-h-[460px] grid-cols-[1.15fr_0.85fr]">
        <section className="relative min-h-0 border-r border-slate-200">
          <OrchestrationGraph state={state} />
        </section>
        <section className="min-h-0 overflow-hidden bg-white px-5 py-4">
          <GovernanceModelPanel state={state} model={marriageLicenseRun.model} />
        </section>
      </div>

      {/* Inline conflict resolution — appears when the build hits the agent conflict */}
      {pendingGate && !resolution ? (
        <ConflictModal
          onApply={(id) => {
            setResolution(id);
            replay.release();
          }}
        />
      ) : null}
    </div>
  );
}
