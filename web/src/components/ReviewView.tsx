"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ConflictDecision, RESOLUTION_LABEL, type ResolutionId } from "@/components/workbench/ConflictModal";

/**
 * The Review-queue detail for a QA flag. Renders the exact same decision as the inline
 * orchestration modal (ConflictDecision) so the two surfaces match — just as a panel
 * within the workbench instead of an overlay.
 */
export function ReviewView() {
  const [resolution, setResolution] = useState<ResolutionId | null>(null);

  return (
    <div className="mx-auto max-w-xl px-6 pb-16 pt-7">
      <header className="mb-5">
        <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">Human in the loop</div>
        <h2 className="font-display text-[clamp(22px,2.6vw,30px)] font-extrabold leading-tight tracking-tight text-slate-900">
          A person has the final say.
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          The agents propose; an accountable officer resolves anything sensitive before it&apos;s published.
        </p>
      </header>

      <AnimatePresence mode="wait">
        {resolution ? (
          <motion.div
            key="resolved"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-emerald-300 bg-emerald-50 px-5 py-4"
          >
            <p className="text-sm text-emerald-900">
              <span className="font-semibold">✓ Resolved — {RESOLUTION_LABEL[resolution]}.</span> Recorded by Chris B.,
              County Privacy Officer.
            </p>
            <button
              onClick={() => setResolution(null)}
              className="shrink-0 rounded-full border border-emerald-300 px-3 py-1.5 text-[12.5px] font-semibold text-emerald-700 hover:bg-emerald-100"
            >
              ↺ Reset
            </button>
          </motion.div>
        ) : (
          <motion.div key="decide" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <ConflictDecision onApply={(id) => setResolution(id)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
