import { StepNav } from "@/components/StepNav";
import { ScaleGridView } from "@/components/ScaleGridView";
import { scaleGrid } from "@/lib/scale";

export default function ScalePage() {
  return (
    <>
      <StepNav active="scale" />
      <ScaleGridView data={scaleGrid} />
    </>
  );
}
