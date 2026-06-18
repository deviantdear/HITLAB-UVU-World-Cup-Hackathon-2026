import { ComparisonView } from "@/components/ComparisonView";
import { businessLicenseComparison } from "@/lib/comparison";

export default function ComparePage() {
  return <ComparisonView comparison={businessLicenseComparison} />;
}
