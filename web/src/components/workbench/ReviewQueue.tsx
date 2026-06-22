"use client";

import { useState } from "react";
import {
  REVIEW_QUEUE,
  REVIEW_INCONSISTENCIES,
  REVIEW_TYPE_LABEL,
  REVIEW_TYPE_STYLE,
  type ReviewItem,
} from "@/lib/workbench";

const LEFT_BORDER: Record<ReviewItem["type"], string> = {
  qa_flag: "border-l-amber-400",
  legislative: "border-l-violet-400",
  inconsistency: "border-l-rose-400",
};

const LEGEND: { type: ReviewItem["type"]; dot: string }[] = [
  { type: "qa_flag", dot: "bg-amber-400" },
  { type: "legislative", dot: "bg-violet-400" },
  { type: "inconsistency", dot: "bg-rose-400" },
];

export function ReviewQueue({
  scanned,
  onScan,
  onOpen,
}: {
  scanned: boolean;
  onScan: () => void;
  onOpen: (item: ReviewItem) => void;
}) {
  const [scanning, setScanning] = useState(false);

  const items = scanned ? [...REVIEW_QUEUE, ...REVIEW_INCONSISTENCIES] : REVIEW_QUEUE;
  const qa = items.filter((i) => i.type === "qa_flag").length;
  const leg = items.filter((i) => i.type === "legislative").length;
  const inc = items.filter((i) => i.type === "inconsistency").length;

  const runScan = () => {
    if (scanning) return;
    setScanning(true);
    window.setTimeout(() => {
      setScanning(false);
      onScan();
    }, 1600);
  };

  return (
    <div className="mx-auto max-w-[1000px] px-[30px] pb-16 pt-7">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="text-sm text-slate-600">
          <span className="font-semibold text-slate-900">{qa} QA flags</span> · {leg} legislative ·{" "}
          {inc} inconsistencies — <span className="font-semibold text-slate-900">{items.length} need a decision.</span>
        </div>
        <button
          onClick={runScan}
          disabled={scanning}
          className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
            scanning
              ? "animate-pulse border-violet-300 bg-violet-50 text-violet-700"
              : "border-violet-300 bg-white text-violet-700 hover:bg-violet-50"
          }`}
        >
          {scanning ? "Scanning all jurisdictions…" : scanned ? "Re-run scan" : "Run scan"}
        </button>
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-wrap gap-4 text-[11.5px] text-slate-500">
        {LEGEND.map((l) => (
          <span key={l.type} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${l.dot}`} />
            {REVIEW_TYPE_LABEL[l.type]}
          </span>
        ))}
      </div>

      {/* Scanning banner */}
      {scanning ? (
        <div className="mb-3 flex animate-pulse items-center gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-800">
          <span className="h-3 w-3 rounded-full border-2 border-rose-400 border-t-transparent" />
          <span>
            <span className="font-semibold">Consistency agent running.</span> One pass compares this record type
            across every Utah jurisdiction at once…
          </span>
        </div>
      ) : null}

      {/* Authority banner */}
      <div className="mb-4 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-navy text-white">⚖</span>
        <p className="text-[13px] text-slate-600">
          <span className="font-semibold text-slate-900">A human holds final authority.</span> Every item — flagged
          field, legal change, or cross-jurisdiction conflict — routes to you for a decision.
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-col gap-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`flex items-center gap-4 rounded-xl border border-slate-200 border-l-4 bg-white px-5 py-4 shadow-sm ${LEFT_BORDER[item.type]}`}
          >
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${REVIEW_TYPE_STYLE[item.type]}`}>
                  {REVIEW_TYPE_LABEL[item.type]}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400">
                  {item.functionName} · {item.entity}
                </span>
              </div>
              <div className="mt-1 font-display text-base font-extrabold text-slate-900">{item.title}</div>
              <div className="mt-0.5 text-[12.5px] text-slate-500">{item.preview}</div>
            </div>
            <span className="flex-none font-mono text-[11px] text-slate-400">{item.meta}</span>
            <button
              onClick={() => onOpen(item)}
              className="flex-none rounded-lg bg-utah-orange px-4 py-2 font-display text-[13px] font-extrabold text-white hover:brightness-105"
            >
              Review →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
