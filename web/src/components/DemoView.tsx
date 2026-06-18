"use client";

import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReplay, type ReplayGate } from "@/hooks/useReplay";
import { marriageLicenseRun } from "@/lib/data";
import { OrchestrationGraph } from "@/components/OrchestrationGraph";
import { GovernanceModelPanel } from "@/components/GovernanceModelPanel";
import { ReplayControls } from "@/components/ReplayControls";
import { StepNav } from "@/components/StepNav";

export function DemoView() {
  const gates = useMemo<ReplayGate[]>(() => {
    const flag = marriageLicenseRun.events.find((e) => e.type === "qa_flag");
    const review = marriageLicenseRun.events.find((e) => e.type === "human_review");
    if (flag && review) {
      return [{ at: flag.t + 150, resumeAt: review.t + 100, label: "Approve as Chris B." }];
    }
    return [];
  }, []);

  const replay = useReplay(marriageLicenseRun.events, { gates });
  const { state, pendingGate, release } = replay;

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      <StepNav active="orchestration" />
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
            Watch it build
          </div>
          <h1 className="font-display text-lg font-extrabold tracking-tight text-navy">
            Ten agents build the Marriage License model
          </h1>
        </div>
        <span className="rounded-full bg-utah-orange/10 px-3 py-1 text-xs font-semibold text-utah-orange">
          Live · Marriage License
        </span>
      </header>

      <div className="border-b border-slate-200 bg-white px-6 py-2.5">
        <ReplayControls replay={replay} />
      </div>

      {/* Human-in-the-loop gate — the on-stage approval moment */}
      <AnimatePresence>
        {pendingGate ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center justify-between gap-4 border-b border-amber-300 bg-amber-50 px-6 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-sm font-bold text-amber-950">
                !
              </span>
              <p className="text-sm text-amber-900">
                <span className="font-semibold">Human review required.</span> The QA agent flagged the
                Social Security Number classification (71% confidence). A person must approve before
                this model is published.
              </p>
            </div>
            <button
              onClick={release}
              className="shrink-0 rounded-full bg-navy px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-navy-deep"
            >
              ✓ {pendingGate.label}
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <main className="grid min-h-0 flex-1 grid-cols-[1.15fr_0.85fr]">
        <section className="relative min-h-0 border-r border-slate-200">
          <OrchestrationGraph state={state} />
        </section>
        <section className="min-h-0 overflow-hidden bg-white px-5 py-4">
          <GovernanceModelPanel state={state} model={marriageLicenseRun.model} />
        </section>
      </main>
    </div>
  );
}
