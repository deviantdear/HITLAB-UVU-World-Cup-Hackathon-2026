import raw from "@/data/businessLicenseComparison.json";
import type { GovernanceModel, FieldKey } from "@/lib/governanceModel";

/** Two governance models for the same function across different entities, plus the detected inequalities. */
export interface ComparisonSet {
  functionId: string;
  title: string;
  left: GovernanceModel;
  right: GovernanceModel;
  inequalities: FieldKey[];
  recommendation: { title: string; text: string };
}

export const businessLicenseComparison = raw as unknown as ComparisonSet;
