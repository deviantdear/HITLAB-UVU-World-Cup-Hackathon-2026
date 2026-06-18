import { StepNav } from "@/components/StepNav";
import { ComparisonView } from "@/components/ComparisonView";

export default function ComparePage() {
  return (
    <>
      <StepNav active="compare" />
      <ComparisonView />
    </>
  );
}
