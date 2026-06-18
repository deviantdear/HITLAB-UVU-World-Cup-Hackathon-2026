import { ScaleGridView } from "@/components/ScaleGridView";
import { scaleGrid } from "@/lib/scale";

export default function ScalePage() {
  return <ScaleGridView data={scaleGrid} />;
}
