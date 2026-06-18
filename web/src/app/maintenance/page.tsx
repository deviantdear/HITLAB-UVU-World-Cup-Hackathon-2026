import { MaintenanceView } from "@/components/MaintenanceView";
import { marriageLicenseMaintenance } from "@/lib/maintenance";

export default function MaintenancePage() {
  return <MaintenanceView update={marriageLicenseMaintenance} />;
}
