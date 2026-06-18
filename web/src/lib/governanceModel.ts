/**
 * Governance Model — the FROZEN contract between the engine (Valerie) and the web app (Craig).
 *
 * Design rationale lives in docs/adr/0001-per-field-provenance-schema.md.
 * The short version: every `Field` carries its own provenance (agent, citations, confidence,
 * reviewStatus). That single choice lets one data structure drive FOUR demo beats —
 * orchestration viz (agent + citations), human review (flag/approve/edit), maintenance
 * (field-level before/after diffs), and equal-rights (compare the same field across entities).
 *
 * The engine emits a `GoldenRun` ({ events, model }) per generation. The web app's primary
 * demo path REPLAYS `events` for a smooth, API-failure-proof animation, then renders `model`.
 */

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------

export type GovernmentUnit =
  | "State"
  | "County"
  | "Municipality"
  | "ServiceDistrict"
  | "PublicEducation";

/** The 10 specialized agents named in the bounty. */
export type AgentId =
  | "legal_authority"
  | "purpose"
  | "use"
  | "data_minimization"
  | "records"
  | "classification"
  | "retention"
  | "decision_point"
  | "redaction"
  | "quality_assurance";

export type SourceType =
  | "utah_code"
  | "usc"
  | "utah_admin_code"
  | "cfr"
  | "local_ordinance"
  | "grs" // General Retention Schedule
  | "agency_record_series"
  | "office_website";

export type ReviewStatus = "auto" | "flagged" | "approved" | "edited";

export type ModelStatus = "draft" | "in_review" | "published";

// ---------------------------------------------------------------------------
// Field-level provenance (the secret sauce)
// ---------------------------------------------------------------------------

export interface Citation {
  /** Human-readable cite, e.g. "Utah Code § 81-2-303". */
  label: string;
  source: SourceType;
  url?: string;
  /** Optional excerpt the agent relied on (for the "what sources did it read" panel). */
  quote?: string;
}

/** BONUS layer hook (SEDI/KERI). Only populated for the SSN overlay in the demo. */
export interface SediEnforcement {
  applicable: boolean;
  /** e.g. "Age proven via a verifiable credential; the clerk never collects or stores DOB." */
  note: string;
}

export interface Field {
  /** The agent's output text — the actual governance answer. */
  value: string;
  agent: AgentId;
  citations: Citation[];
  /** 0..1. Drives the "needs human review" flag and the viz intensity. */
  confidence: number;
  reviewStatus: ReviewStatus;
  /** Set once a human reviews, e.g. "Chris B., Privacy Officer". */
  reviewedBy?: string;
  /** QA agent note or human reviewer comment. */
  note?: string;
  sediEnforcement?: SediEnforcement;
}

/** The 11 governance fields per record — matches the spreadsheet columns exactly. */
export interface GovernanceFields {
  personalData: Field; // Data Minimization Agent
  useOfPersonalData: Field; // Use Agent
  purposeOfProcessing: Field; // Purpose Agent
  statutoryAuthorization: Field; // Legal Authority Agent (function)
  authorityForProcessingPersonalData: Field; // Legal Authority Agent (personal data)
  valueOfRecords: Field; // Records Agent
  primaryClassification: Field; // Classification Agent (record)
  secondaryClassification: Field; // Classification Agent (personal data)
  retentionAndDisposition: Field; // Retention Agent (record)
  retentionPeriodForPersonalData: Field; // Retention Agent (personal data)
  generalRetentionSchedule: Field; // Retention Agent (GRS cite)
}

export type FieldKey = keyof GovernanceFields;

// ---------------------------------------------------------------------------
// Model hierarchy: Transaction -> Record -> Fields
// ---------------------------------------------------------------------------

export interface DecisionPoint {
  id: string;
  name: string; // "Approve or deny license"
  kind:
    | "licensing"
    | "eligibility"
    | "benefit"
    | "approval"
    | "denial"
    | "other";
}

export interface GovernanceRecord {
  id: string;
  name: string; // "Application for License to Marry"
  fields: GovernanceFields;
}

export interface Transaction {
  id: string;
  name: string; // "Process application and payment"
  decisionPoints: DecisionPoint[];
  records: GovernanceRecord[];
}

// ---------------------------------------------------------------------------
// Versioning (powers the maintenance beat)
// ---------------------------------------------------------------------------

export interface FieldChange {
  /** Dotted path into the model, e.g. "transactions[0].records[0].fields.retentionAndDisposition". */
  path: string;
  fieldKey: FieldKey;
  agent: AgentId;
  before: string;
  after: string;
  /** Why it changed — the triggering law. */
  rationale: string;
}

export interface ChangeEntry {
  version: number;
  /** ISO date — stamped by the engine/human, NOT generated inside the LLM run. */
  date: string;
  /** "Initial creation" | "Utah H.B. 391 (hypothetical) enacted". */
  trigger: string;
  summary: string;
  fieldChanges: FieldChange[];
  approvedBy?: string;
}

export interface GovernanceModel {
  functionId: string; // "marriage-license" | "business-license" — shared across entities for equal-rights compare
  title: string; // "Marriage License"
  governmentUnit: GovernmentUnit;
  entityName: string; // "Utah County" | "Orem City"
  office: string; // "Clerk"
  coreFunction: string; // "Marriage licenses"
  primaryDuty: string; // "Issue marriage licenses"
  version: number;
  status: ModelStatus;
  transactions: Transaction[];
  changelog: ChangeEntry[];
  /** ISO — stamped after the run. */
  generatedAt?: string;
}

// ---------------------------------------------------------------------------
// Orchestration event log (the second artifact — drives "watch it build")
// ---------------------------------------------------------------------------

export type AgentRunStatus = "idle" | "working" | "done" | "flagged" | "error";

/** `t` = milliseconds from run start, so the web app can pace the replay for narration. */
export type OrchestrationEvent =
  | { t: number; type: "run_started"; functionId: string; entityName: string }
  | { t: number; type: "agent_status"; agent: AgentId; status: AgentRunStatus; message?: string }
  | { t: number; type: "agent_read_source"; agent: AgentId; citation: Citation }
  | {
      t: number;
      type: "field_produced";
      agent: AgentId;
      path: string;
      fieldKey: FieldKey;
      value: string;
      confidence: number;
    }
  | { t: number; type: "qa_flag"; path: string; fieldKey: FieldKey; reason: string }
  | {
      t: number;
      type: "human_review";
      path: string;
      fieldKey: FieldKey;
      action: "approved" | "edited";
      reviewedBy: string;
      newValue?: string;
    }
  | { t: number; type: "model_published"; functionId: string; version: number };

/** One generation = the ordered event stream + the final assembled model. */
export interface GoldenRun {
  events: OrchestrationEvent[];
  model: GovernanceModel;
}

/** A cell in the "scale" grid: which entity × function combos exist and their state. */
export interface ScaleGridCell {
  entityName: string;
  governmentUnit: GovernmentUnit;
  functionId: string;
  functionTitle: string;
  state: "published" | "generating" | "ready"; // ready = not yet generated
  version?: number;
}
