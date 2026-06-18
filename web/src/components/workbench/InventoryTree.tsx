"use client";

import { useState } from "react";
import {
  INVENTORY,
  INV_STATUS_LABEL,
  INV_STATUS_STYLE,
  DASHBOARD,
  type InvNode,
} from "@/lib/workbench";

const TOP_META: Record<string, { badge: string; color: string; sublabel: string }> = {
  county: { badge: "CO", color: "#0B3D6B", sublabel: "29 counties" },
  municipality: { badge: "MU", color: "#0EA5E9", sublabel: "253 cities & towns" },
  school: { badge: "SD", color: "#7C3AED", sublabel: "41 districts" },
  state: { badge: "ST", color: "#059669", sublabel: "State agencies" },
};

function collectParents(nodes: InvNode[], acc: Set<string>): Set<string> {
  for (const n of nodes) {
    if (n.children?.length) {
      acc.add(n.id);
      collectParents(n.children, acc);
    }
  }
  return acc;
}

function countLeaves(node: InvNode): { modeled: number; total: number } {
  if (!node.children?.length) {
    const modeled = node.status && node.status !== "not_modeled" ? 1 : 0;
    return { modeled, total: 1 };
  }
  return node.children.reduce(
    (acc, c) => {
      const r = countLeaves(c);
      return { modeled: acc.modeled + r.modeled, total: acc.total + r.total };
    },
    { modeled: 0, total: 0 },
  );
}

const STATS = INVENTORY.reduce(
  (acc, u) => {
    const r = countLeaves(u);
    return {
      unitTypes: acc.unitTypes + 1,
      offices: acc.offices + (u.children?.length ?? 0),
      modeled: acc.modeled + r.modeled,
      records: acc.records + r.total,
    };
  },
  { unitTypes: 0, offices: 0, modeled: 0, records: 0 },
);

function TreeRow({
  node,
  depth,
  expanded,
  toggle,
  onGenerate,
  onOpenModel,
}: {
  node: InvNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
  onGenerate?: () => void;
  onOpenModel?: () => void;
}) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);
  const isLeaf = !hasChildren;
  const top = depth === 0 ? TOP_META[node.id] : undefined;
  const counts = hasChildren ? countLeaves(node) : null;
  const openable = isLeaf && node.status && node.status !== "not_modeled";

  return (
    <div>
      <div
        className={`flex items-center gap-2 border-b border-slate-50 py-2 pr-3 ${
          hasChildren || openable ? "cursor-pointer hover:bg-slate-50" : ""
        }`}
        style={{ paddingLeft: 12 + depth * 22 }}
        onClick={hasChildren ? () => toggle(node.id) : openable ? onOpenModel : undefined}
      >
        {hasChildren ? (
          <span className={`flex-none text-[11px] text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
        ) : (
          <span className="flex-none text-slate-300">•</span>
        )}

        {top ? (
          <span
            className="grid h-5 w-6 flex-none place-items-center rounded text-[9px] font-extrabold text-white"
            style={{ background: top.color }}
          >
            {top.badge}
          </span>
        ) : null}

        <span className={`flex-1 ${isLeaf ? "text-[13px] text-slate-800" : depth === 0 ? "font-display text-[14px] font-extrabold text-navy" : "text-[13px] font-semibold text-slate-700"}`}>
          {node.label}
          {top ? <span className="ml-2 text-[11px] font-normal text-slate-400">{top.sublabel}</span> : null}
          {node.sublabel ? <span className="ml-2 text-[11px] font-normal text-slate-400">{node.sublabel}</span> : null}
        </span>

        {counts ? (
          <span className="flex-none text-[11px] font-medium text-slate-400">
            {counts.modeled}/{counts.total} modeled
          </span>
        ) : null}

        {isLeaf && node.status ? (
          <span className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${INV_STATUS_STYLE[node.status]}`}>
              {INV_STATUS_LABEL[node.status]}
              {node.version ? ` v${node.version}` : ""}
            </span>
            {node.status === "not_modeled" ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onGenerate?.();
                }}
                className="rounded-md border border-dashed border-slate-300 px-2 py-0.5 text-[11px] font-semibold text-slate-500 hover:border-utah-orange hover:text-utah-orange"
              >
                + Generate
              </button>
            ) : (
              <span className="text-base text-slate-300">›</span>
            )}
          </span>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <div>
          {node.children!.map((c) => (
            <TreeRow key={c.id} node={c} depth={depth + 1} expanded={expanded} toggle={toggle} onGenerate={onGenerate} onOpenModel={onOpenModel} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function InventoryTree({ onGenerate, onOpenModel }: { onGenerate?: () => void; onOpenModel?: () => void }) {
  const [expanded, setExpanded] = useState<Set<string>>(() => collectParents(INVENTORY, new Set()));
  const allParents = () => collectParents(INVENTORY, new Set());
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-[1080px] px-[30px] pb-16 pt-7">
      {/* Stats header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-br from-navy to-navy-deep px-6 py-5 text-white">
        <div>
          <div className="text-[10.5px] font-bold uppercase tracking-[0.16em] text-white/55">Statewide governance inventory</div>
          <div className="mt-1 font-display text-2xl font-extrabold">
            {DASHBOARD.governedCount.toLocaleString()}{" "}
            <span className="text-base font-semibold text-white/60">of ~{DASHBOARD.statewideTotal.toLocaleString()} functions modeled</span>
          </div>
          <div className="mt-2 h-1.5 w-[320px] max-w-full overflow-hidden rounded-full bg-white/15">
            <div className="h-full rounded-full bg-utah-orange" style={{ width: "9%" }} />
          </div>
        </div>
        <div className="flex gap-6 text-center">
          <div><div className="font-display text-xl font-extrabold">{STATS.unitTypes}</div><div className="text-[10px] uppercase tracking-wide text-white/55">unit types</div></div>
          <div><div className="font-display text-xl font-extrabold">{STATS.offices}</div><div className="text-[10px] uppercase tracking-wide text-white/55">offices</div></div>
          <div><div className="font-display text-xl font-extrabold">{STATS.modeled}/{STATS.records}</div><div className="text-[10px] uppercase tracking-wide text-white/55">records in view</div></div>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-[560px] text-[13px] leading-relaxed text-slate-500">
          Utah&apos;s governance model nests the way the state does — <strong className="text-slate-700">unit type → office → core function → record</strong>.
          Expand a branch to see what&apos;s modeled and what still needs work.
        </p>
        <div className="flex gap-2">
          <button onClick={() => setExpanded(allParents())} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100">Expand all</button>
          <button onClick={() => setExpanded(new Set())} className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-100">Collapse all</button>
        </div>
      </div>

      <div className="mb-3 flex flex-wrap gap-4 text-[11px] text-slate-500">
        {(["published", "in_review", "needs_update", "not_modeled"] as const).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5">
            <span className={`h-2.5 w-2.5 rounded-full ${INV_STATUS_STYLE[s].split(" ")[0]}`} />
            {INV_STATUS_LABEL[s]}
          </span>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {INVENTORY.map((n) => (
          <TreeRow key={n.id} node={n} depth={0} expanded={expanded} toggle={toggle} onGenerate={onGenerate} onOpenModel={onOpenModel} />
        ))}
      </div>
    </div>
  );
}
