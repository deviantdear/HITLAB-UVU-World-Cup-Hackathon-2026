"use client";

import type { UseReplay } from "@/hooks/useReplay";

const SPEEDS = [0.5, 1, 2];

export function ReplayControls({ replay }: { replay: UseReplay }) {
  const { playing, toggle, restart, speed, setSpeed, cursor, duration, seek } = replay;
  const finished = cursor >= duration && duration > 0;

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={toggle}
        className="inline-flex h-9 items-center gap-2 rounded-full bg-navy px-4 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
      >
        {playing ? "❚❚ Pause" : finished ? "↻ Replay" : "▶ Play"}
      </button>
      <button
        onClick={restart}
        className="inline-flex h-9 items-center rounded-full border border-slate-300 px-3 text-sm font-medium text-slate-600 hover:bg-slate-100"
      >
        Restart
      </button>

      <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-white p-0.5">
        {SPEEDS.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors ${
              speed === s ? "bg-navy text-white" : "text-slate-500 hover:bg-slate-100"
            }`}
          >
            {s}×
          </button>
        ))}
      </div>

      <input
        type="range"
        min={0}
        max={duration}
        value={Math.min(cursor, duration)}
        onChange={(e) => seek(Number(e.target.value))}
        className="h-1.5 flex-1 cursor-pointer accent-utah-orange"
        aria-label="Scrub orchestration timeline"
      />
      <span className="w-14 text-right text-xs tabular-nums text-slate-400">
        {(Math.min(cursor, duration) / 1000).toFixed(1)}s
      </span>
    </div>
  );
}
