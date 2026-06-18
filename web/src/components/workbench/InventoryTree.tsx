"use client";

import { useState } from "react";
import {
  INVENTORY,
  INV_STATUS_LABEL,
  INV_STATUS_STYLE,
  DASHBOARD,
  type InvNode,
} from "@/lib/workbench";

function collectParents(nodes: InvNode[], acc: Set<string>): Set<string> {
  for (const n of nodes) {
    if (n.children?.length) {
      acc.add(n.id);
      collectParents(n.children, acc);
    }
  }
  return acc;
}

function TreeRow({
  node,
  depth,
  expanded,
  toggle,
}: {
  node: InvNode;
  depth: number;
  expanded: Set<string>;
  toggle: (id: string) => void;
}) {
  const hasChildren = !!node.children?.length;
  const isOpen = expanded.has(node.id);
  const isLeaf = !hasChildren;

  return (
    <div>
      <div
        className={`flex items-center gap-2 border-b border-slate-50 py-2 pr-3 ${hasChildren ? "cursor-pointer hover:bg-slate-50" : ""}`}
        style={{ paddingLeft: 12 + depth * 22 }}
        onClick={hasChildren ? () => toggle(node.id) : undefined}
      >
        {hasChildren ? (
          <span className={`flex-none text-[11px] text-slate-400 transition-transform ${isOpen ? "rotate-90" : ""}`}>▶</span>
        ) : (
          <span className="flex-none text-slate-300">•</span>
        )}
        <span className={`flex-1 ${isLeaf ? "text-[13px] text-slate-800" : depth === 0 ? "font-display text-[14px] font-extrabold text-navy" : "text-[13px] font-semibold text-slate-700"}`}>
          {node.label}
          {node.sublabel ? <span className="ml-2 text-[11px] font-normal text-slate-400">{node.sublabel}</span> : null}
        </span>

        {isLeaf && node.status ? (
          <span className="flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${INV_STATUS_STYLE[node.status]}`}>
              {INV_STATUS_LABEL[node.status]}
              {node.version ? ` v${node.version}` : ""}
            </span>
            {node.status === "not_modeled" ? (
              <button className="rounded-md border border-dashed border-slate-300 px-2 py-0.5 text-[11px] font-semibold text-slate-500 hover:border-utah-orange hover:text-utah-orange">
                + Generate
              </button>
            ) : null}
          </span>
        ) : null}
      </div>

      {hasChildren && isOpen ? (
        <div>
          {node.children!.map((c) => (
            <TreeRow key={c.id} node={c} depth={depth + 1} expanded={expanded} toggle={toggle} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function InventoryTree() {
  const [expanded, setExpanded] = useState<Set<string>>(() => collectParents(INVENTORY, new Set()));
  const toggle = (id: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-[1080px] px-[30px] pb-16 pt-7">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <p className="max-w-[620px] text-sm leading-relaxed text-slate-500">
          Governance models organized the way Utah governs — <strong className="text-slate-700">Government Unit → Office → Function → Record</strong>.
          Only the functions each entity actually performs appear here. Agents keep the volume current; you handle the exceptions in the queue.
        </p>
        <div className="text-right">
          <div className="font-display text-2xl font-extrabold text-slate-900">
            {DASHBOARD.governedCount.toLocaleString()}{" "}
            <span className="text-base font-semibold text-slate-400">/ ~{DASHBOARD.statewideTotal.toLocaleString()}</span>
          </div>
          <div className="text-[11px] uppercase tracking-wide text-slate-400">functions modeled statewide</div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {INVENTORY.map((n) => (
          <TreeRow key={n.id} node={n} depth={0} expanded={expanded} toggle={toggle} />
        ))}
      </div>
    </div>
  );
}
