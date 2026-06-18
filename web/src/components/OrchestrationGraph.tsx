"use client";

import "@xyflow/react/dist/style.css";
import { useEffect } from "react";
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import { AGENTS, STATUS_STYLE } from "@/lib/agents";
import { AgentNode, type AgentNodeData } from "@/components/AgentNode";
import type { ReplayState } from "@/hooks/useReplay";
import type { AgentRunStatus } from "@/lib/governanceModel";

interface HubData {
  done: number;
  total: number;
  published: number | null;
  [key: string]: unknown;
}

function HubNode({ data }: NodeProps) {
  const d = data as HubData;
  return (
    <div className="w-[180px] rounded-2xl border-2 border-navy bg-navy px-4 py-3 text-white shadow-md">
      <Handle type="source" position={Position.Right} className="!h-1.5 !w-1.5 !border-0 !bg-white/60" />
      <div className="text-sm font-bold tracking-tight">Orchestrator</div>
      <div className="mt-0.5 text-[11px] text-white/70">10 specialized agents</div>
      <div className="mt-2 text-2xl font-bold tabular-nums">
        {d.done}
        <span className="text-base font-medium text-white/60">/{d.total}</span>
      </div>
      <div className="text-[10px] uppercase tracking-wide text-white/60">agents complete</div>
      {d.published != null ? (
        <div className="mt-2 inline-flex rounded-full bg-emerald-400 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-950">
          Published v{d.published}
        </div>
      ) : null}
    </div>
  );
}

const nodeTypes = { agent: AgentNode, hub: HubNode };

const HUB_POS = { x: 40, y: 340 };
function agentPos(i: number) {
  const col = i < 5 ? 0 : 1;
  const row = i % 5;
  return { x: 320 + col * 270, y: 20 + row * 150 };
}

function buildNodes(state: ReplayState): Node[] {
  const done = AGENTS.filter((a) => state.agentStatus[a.id] === "done").length;
  const hub: Node = {
    id: "hub",
    type: "hub",
    position: HUB_POS,
    data: { done, total: AGENTS.length, published: state.publishedVersion } satisfies HubData,
    draggable: false,
    selectable: false,
  };
  const agents: Node[] = AGENTS.map((a, i) => ({
    id: a.id,
    type: "agent",
    position: agentPos(i),
    data: {
      label: a.label,
      blurb: a.blurb,
      status: state.agentStatus[a.id] ?? "idle",
      message: state.agentMessage[a.id],
    } satisfies AgentNodeData,
    draggable: false,
    selectable: false,
  }));
  return [hub, ...agents];
}

function buildEdges(state: ReplayState): Edge[] {
  return AGENTS.map((a) => {
    const status: AgentRunStatus = state.agentStatus[a.id] ?? "idle";
    const active = status === "working";
    return {
      id: `e-hub-${a.id}`,
      source: "hub",
      target: a.id,
      type: "smoothstep",
      animated: active,
      style: { stroke: STATUS_STYLE[status].edge, strokeWidth: active ? 2.5 : 1.5 },
    };
  });
}

export function OrchestrationGraph({ state }: { state: ReplayState }) {
  const [nodes, setNodes] = useNodesState<Node>(buildNodes(state));
  const [edges, setEdges] = useEdgesState<Edge>(buildEdges(state));

  useEffect(() => {
    setNodes(buildNodes(state));
    setEdges(buildEdges(state));
  }, [state, setNodes, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.15 }}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      zoomOnDoubleClick={false}
      panOnDrag={false}
      panOnScroll={false}
      preventScrolling={false}
      minZoom={0.2}
    >
      <Background variant={BackgroundVariant.Dots} gap={20} size={1} color="#e2e8f0" />
    </ReactFlow>
  );
}
