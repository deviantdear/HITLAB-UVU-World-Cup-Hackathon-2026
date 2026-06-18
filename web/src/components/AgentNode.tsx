"use client";

import { Handle, Position, type NodeProps } from "@xyflow/react";
import type { AgentRunStatus } from "@/lib/governanceModel";
import { STATUS_STYLE } from "@/lib/agents";

export interface AgentNodeData {
  label: string;
  blurb: string;
  status: AgentRunStatus;
  message?: string;
  [key: string]: unknown;
}

export function AgentNode({ data }: NodeProps) {
  const d = data as AgentNodeData;
  const s = STATUS_STYLE[d.status] ?? STATUS_STYLE.idle;
  const active = d.status === "working";

  return (
    <div
      className={`w-[214px] rounded-xl border-2 px-3 py-2.5 shadow-sm transition-all duration-300 ${s.ring} ${
        active ? "scale-[1.03] shadow-md" : ""
      }`}
    >
      <Handle type="target" position={Position.Left} className="!h-1.5 !w-1.5 !border-0 !bg-slate-300" />
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-semibold text-navy">{d.label}</span>
        <span className="flex items-center gap-1.5">
          <span
            className={`h-2 w-2 rounded-full ${s.dot} ${active ? "animate-pulse" : ""}`}
          />
          <span className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
            {s.label}
          </span>
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-snug text-slate-500">{d.blurb}</p>
      {d.message ? (
        <p className="mt-1.5 truncate text-[11px] italic text-slate-600" title={d.message}>
          {d.message}
        </p>
      ) : null}
      <Handle type="source" position={Position.Right} className="!h-1.5 !w-1.5 !border-0 !bg-slate-300" />
    </div>
  );
}
