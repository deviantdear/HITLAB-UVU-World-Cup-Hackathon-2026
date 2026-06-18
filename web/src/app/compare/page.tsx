import { StepNav } from "@/components/StepNav";
import { ComparisonView } from "@/components/ComparisonView";
import { businessLicenseComparison } from "@/lib/comparison";

export default function ComparePage() {
  return (
    <>
      <StepNav active="compare" />
      <ComparisonView comparison={businessLicenseComparison} />
    </>
  );
}
