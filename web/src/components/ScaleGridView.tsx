"use client";

import { useMemo, useState, type ReactNode } from "react";
import type { CellState, ScaleGridData } from "@/lib/scale";

interface CellValue {
  state: CellState;
  version?: number;
}

function key(entity: string, functionId: string) {
  return `${entity}||${functionId}`;
}

export function ScaleGridView({ data }: { data: ScaleGridData }) {
  const base = useMemo(() => {
    const m = new Map<string, CellValue>();
    for (const c of data.cells) m.set(key(c.entity, c.functionId), { state: c.state, version: c.version });
    return m;
  }, [data.cells]);

  const [overrides, setOverrides] = useState<Record<string, CellValue>>({});

  const cell = (entity: string, fnId: string): CellValue =>
    overrides[key(entity, fnId)] ?? base.get(key(entity, fnId)) ?? { state: "ready" };

  const generate = (entity: string, fnId: string) => {
    const k = key(entity, fnId);
    setOverrides((o) => ({ ...o, [k]: { state: "generating" } }));
    window.setTimeout(() => {
      setOverrides((o) => ({ ...o, [k]: { state: "published", version: 1 } }));
    }, 1600);
  };

  const publishedCount = useMemo(() => {
    let n = 0;
    for (const e of data.entities)
      for (const f of data.functions) if (cell(e.name, f.id).state === "published") n++;
    return n;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [overrides, base, data]);

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-5">
      <header className="mb-4">
        <div className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-utah-orange">
          The problem, at scale
        </div>
        <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900">
          Most government functions are ungoverned.
        </h1>
        <p className="mt-1 text-sm text-slate-500">
          Every cell is a complete governance model. One orchestration run fills one cell in minutes.
        </p>
      </header>

      {/* Counter */}
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tabular-nums text-navy">{publishedCount}</span>
          <span className="text-sm text-slate-500">
            of {data.totalEstimate.toLocaleString()}+ governance models generated statewide
          </span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-utah-orange"
            style={{ width: `${Math.max(0.6, (publishedCount / data.totalEstimate) * 100)}%` }}
          />
        </div>
        <p className="mt-2 text-[11px] text-slate-400">
          Click any empty cell to generate its model — the same orchestration, applied to a new
          entity and function.
        </p>
      </div>

      {/* Matrix */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-3">
        <div
          className="grid gap-1.5"
          style={{ gridTemplateColumns: `190px repeat(${data.functions.length}, minmax(120px, 1fr))` }}
        >
          <div />
          {data.functions.map((f) => (
            <div key={f.id} className="px-1 pb-1 text-center text-[11px] font-semibold text-navy">
              {f.title}
            </div>
          ))}

          {data.entities.map((e) => (
            <FragmentRow key={e.name}>
              <div className="flex items-center pr-2 text-right text-[11px] font-medium text-slate-600">
                <span className="ml-auto">{e.name}</span>
              </div>
              {data.functions.map((f) => {
                const c = cell(e.name, f.id);
                return <Cell key={f.id} value={c} onGenerate={() => generate(e.name, f.id)} />;
              })}
            </FragmentRow>
          ))}
        </div>
      </div>
    </div>
  );
}

function FragmentRow({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Cell({ value, onGenerate }: { value: CellValue; onGenerate: () => void }) {
  if (value.state === "published") {
    return (
      <div className="flex h-12 items-center justify-center rounded-lg border-2 border-emerald-400 bg-emerald-50 text-xs font-bold text-emerald-700">
        ✓ v{value.version ?? 1}
      </div>
    );
  }
  if (value.state === "generating") {
    return (
      <div className="flex h-12 animate-pulse items-center justify-center rounded-lg border-2 border-sky-400 bg-sky-50 text-[11px] font-semibold text-sky-700">
        Generating…
      </div>
    );
  }
  return (
    <button
      onClick={onGenerate}
      className="flex h-12 items-center justify-center rounded-lg border-2 border-dashed border-slate-200 text-[11px] font-medium text-slate-400 transition-colors hover:border-utah-orange hover:bg-utah-orange/5 hover:text-utah-orange"
    >
      + Generate
    </button>
  );
}
