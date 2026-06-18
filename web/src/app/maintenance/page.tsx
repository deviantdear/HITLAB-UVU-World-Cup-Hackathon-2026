import { StepNav } from "@/components/StepNav";
import { MaintenanceView } from "@/components/MaintenanceView";
import { marriageLicenseMaintenance } from "@/lib/maintenance";

export default function MaintenancePage() {
  return (
    <>
      <StepNav active="maintenance" />
      <MaintenanceView update={marriageLicenseMaintenance} />
    </>
  );
}
