import type { FieldKey, GovernanceModel, Field } from "@/lib/governanceModel";

/** Canonical display order — matches the spreadsheet columns / Marriage Model. */
export const FIELD_ORDER: FieldKey[] = [
  "personalData",
  "useOfPersonalData",
  "purposeOfProcessing",
  "statutoryAuthorization",
  "authorityForProcessingPersonalData",
  "valueOfRecords",
  "primaryClassification",
  "secondaryClassification",
  "retentionAndDisposition",
  "retentionPeriodForPersonalData",
  "generalRetentionSchedule",
];

export const FIELD_LABEL: Record<FieldKey, string> = {
  personalData: "Personal Data in the Record",
  useOfPersonalData: "Use of Personal Data",
  purposeOfProcessing: "Purpose of Processing",
  statutoryAuthorization: "Statutory Authorization",
  authorityForProcessingPersonalData: "Authority for Processing Personal Data",
  valueOfRecords: "Value of the Record",
  primaryClassification: "Primary Classification",
  secondaryClassification: "Secondary Classification",
  retentionAndDisposition: "Retention & Disposition",
  retentionPeriodForPersonalData: "Retention Period for Personal Data",
  generalRetentionSchedule: "General Retention Schedule",
};

/** Look up the authored field (citations, sediEnforcement, etc.) from the final model by path. */
export function getFieldByPath(model: GovernanceModel, path: string): Field | undefined {
  const m = path.match(/transactions\[(\d+)\]\.records\[(\d+)\]\.fields\.(\w+)/);
  if (!m) return undefined;
  const [, t, r, key] = m;
  return model.transactions[Number(t)]?.records[Number(r)]?.fields[key as FieldKey];
}
