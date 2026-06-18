import { StepNav } from "@/components/StepNav";
import { ModelDocumentView } from "@/components/ModelDocumentView";

export default function ModelPage() {
  return (
    <>
      <StepNav active="model" />
      <ModelDocumentView />
    </>
  );
}
