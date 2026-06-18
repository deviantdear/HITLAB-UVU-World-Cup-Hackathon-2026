import { StepNav } from "@/components/StepNav";
import { SediCodaView } from "@/components/SediCodaView";

export default function SediPage() {
  return (
    <>
      <StepNav active="sedi" />
      <SediCodaView />
    </>
  );
}
