"use client";

import { useReplay } from "@/hooks/useReplay";
import { marriageLicenseRun } from "@/lib/data";
import { OrchestrationGraph } from "@/components/OrchestrationGraph";
import { GovernanceModelPanel } from "@/components/GovernanceModelPanel";
import { ReplayControls } from "@/components/ReplayControls";

export function DemoView() {
  const replay = useReplay(marriageLicenseRun.events);
  const { state } = replay;

  return (
    <div className="flex h-screen flex-col bg-slate-50">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-3">
        <div>
          <h1 className="text-lg font-bold tracking-tight text-navy">
            Utah Data Governance · Agent Orchestration
          </h1>
          <p className="text-xs text-slate-500">
            Watch 10 specialized AI agents build a governance model — with a human in the loop.
          </p>
        </div>
        <span className="rounded-full bg-utah-orange/10 px-3 py-1 text-xs font-semibold text-utah-orange">
          Demo · Marriage License
        </span>
      </header>

      {/* Controls */}
      <div className="border-b border-slate-200 bg-white px-6 py-2.5">
        <ReplayControls replay={replay} />
      </div>

      {/* Main split */}
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
