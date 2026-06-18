import { StepNav } from "@/components/StepNav";
import { MaintenanceView } from "@/components/MaintenanceView";

export default function MaintenancePage() {
  return (
    <>
      <StepNav active="maintenance" />
      <MaintenanceView />
    </>
  );
}
