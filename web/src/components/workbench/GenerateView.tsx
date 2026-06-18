"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReplay, type ReplayGate } from "@/hooks/useReplay";
import { marriageLicenseRun } from "@/lib/data";
import { OrchestrationGraph } from "@/components/OrchestrationGraph";
import { GovernanceModelPanel } from "@/components/GovernanceModelPanel";
import { ReplayControls } from "@/components/ReplayControls";

/**
 * The "watch the agents build a model" flow. Runs the 10-agent orchestration live, then pauses at
 * the QA flag and hands the flagged field off to the Review queue (create → review loop).
 */
export function GenerateView({ onFlagged }: { onFlagged: () => void }) {
  const gates = useMemo<ReplayGate[]>(() => {
    const flag = marriageLicenseRun.events.find((e) => e.type === "qa_flag");
    const review = marriageLicenseRun.events.find((e) => e.type === "human_review");
    if (flag && review) return [{ at: flag.t + 150, resumeAt: review.t + 100, label: "" }];
    return [];
  }, []);

  const replay = useReplay(marriageLicenseRun.events, { gates, autoPlay: true });
  const { state, pendingGate } = replay;

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

      <AnimatePresence>
        {pendingGate ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between gap-4 border-b border-amber-300 bg-amber-50 px-6 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-amber-950">!</span>
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Draft complete — 1 field flagged for human review.</span>{" "}
                The Quality Assurance agent held back the Secondary Classification at low confidence.
              </p>
            </div>
            <button
              onClick={onFlagged}
              className="shrink-0 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white hover:bg-navy-deep"
            >
              Open in review queue →
            </button>
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
    </div>
  );
}
