import raw from "@/data/marriageLicenseMaintenance.json";
import type { AgentId, Citation, FieldKey } from "@/lib/governanceModel";

export interface MaintenanceChange {
  fieldKey: FieldKey;
  label: string;
  before: string;
  after: string;
  rationale: string;
  agent: AgentId;
  citation: Citation;
}

export interface MaintenanceUpdate {
  functionId: string;
  title: string;
  entityName: string;
  fromVersion: number;
  toVersion: number;
  trigger: { label: string; illustrative: boolean; summary: string; detectedBy: AgentId };
  changes: MaintenanceChange[];
}

export const marriageLicenseMaintenance = raw as unknown as MaintenanceUpdate;
