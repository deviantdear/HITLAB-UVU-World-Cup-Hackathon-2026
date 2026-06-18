"use client";

import { useState } from "react";
import {
  REVIEW_QUEUE,
  REVIEW_TYPE_LABEL,
  REVIEW_TYPE_STYLE,
  type ReviewItem,
} from "@/lib/workbench";

export function ReviewQueue({ onOpen }: { onOpen: (item: ReviewItem) => void }) {
  const [scanned, setScanned] = useState(false);

  return (
    <div className="mx-auto max-w-[980px] px-[30px] pb-16 pt-7">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[560px] text-sm leading-relaxed text-slate-500">
          One queue, three sources — QA flags from generation, legislative-change proposals, and
          cross-jurisdiction inconsistencies. You review the exceptions; the agents handle the volume.
        </p>
        <button
          onClick={() => setScanned(true)}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            scanned ? "border border-emerald-300 bg-emerald-50 text-emerald-700" : "bg-navy text-white hover:bg-navy-deep"
          }`}
        >
          {scanned ? "✓ Scan complete — 4 inconsistencies flagged" : "Run consistency scan"}
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {REVIEW_QUEUE.map((item) => (
          <button
            key={item.id}
            onClick={() => onOpen(item)}
            className="flex w-full items-center gap-4 border-b border-slate-100 px-5 py-4 text-left transition-colors last:border-0 hover:bg-slate-50"
          >
            <span className={`flex-none rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${REVIEW_TYPE_STYLE[item.type]}`}>
              {REVIEW_TYPE_LABEL[item.type]}
            </span>
            <div className="min-w-0 flex-1">
              <div className="font-display text-sm font-bold text-slate-900">
                {item.title}
              </div>
              <div className="mt-0.5 text-xs text-slate-500">
                {item.functionName} · {item.entity}
              </div>
              <div className="mt-1 truncate text-xs text-slate-400">{item.preview}</div>
            </div>
            <span className="flex-none font-mono text-[11px] text-slate-400">{item.meta}</span>
            <span className="flex-none rounded-lg bg-utah-orange px-3 py-1.5 font-display text-[13px] font-extrabold text-white">
              Review →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
