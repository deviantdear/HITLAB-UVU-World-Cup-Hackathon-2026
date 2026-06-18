import type { AgentId, AgentRunStatus } from "@/lib/governanceModel";

export interface AgentMeta {
  id: AgentId;
  label: string;
  blurb: string;
}

/** The 10 specialized agents from the bounty, in orchestration order. */
export const AGENTS: AgentMeta[] = [
  { id: "records", label: "Records", blurb: "Records generated & their value" },
  { id: "legal_authority", label: "Legal Authority", blurb: "Statutes authorizing the function & data processing" },
  { id: "purpose", label: "Purpose", blurb: "Why the personal data is processed" },
  { id: "use", label: "Use", blurb: "How the personal data is used" },
  { id: "data_minimization", label: "Data Minimization", blurb: "Minimum personal data necessary" },
  { id: "classification", label: "Classification", blurb: "Public / private / protected / controlled / exempt" },
  { id: "retention", label: "Retention", blurb: "Retention period, disposition & GRS" },
  { id: "decision_point", label: "Decision Point", blurb: "Where licensing / eligibility decisions are made" },
  { id: "redaction", label: "Redaction", blurb: "What must be redacted before public release" },
  { id: "quality_assurance", label: "Quality Assurance", blurb: "Accuracy, conflicts & human-review needs" },
];

export const AGENT_LABEL: Record<AgentId, string> = Object.fromEntries(
  AGENTS.map((a) => [a.id, a.label]),
) as Record<AgentId, string>;

export interface StatusStyle {
  ring: string; // border + bg utility classes
  dot: string; // status dot color
  label: string;
  edge: string; // edge stroke color (hex, for React Flow)
}

export const STATUS_STYLE: Record<AgentRunStatus, StatusStyle> = {
  idle: { ring: "border-slate-200 bg-white", dot: "bg-slate-300", label: "Idle", edge: "#cbd5e1" },
  working: { ring: "border-sky-400 bg-sky-50", dot: "bg-sky-500", label: "Working", edge: "#0ea5e9" },
  done: { ring: "border-emerald-400 bg-emerald-50", dot: "bg-emerald-500", label: "Done", edge: "#10b981" },
  flagged: { ring: "border-amber-500 bg-amber-50", dot: "bg-amber-500", label: "Flagged", edge: "#f59e0b" },
  error: { ring: "border-red-400 bg-red-50", dot: "bg-red-500", label: "Error", edge: "#ef4444" },
};
