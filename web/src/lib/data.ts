import raw from "@/data/marriageLicenseGoldenRun.json";
import type { GoldenRun } from "@/lib/governanceModel";

/**
 * The committed golden run = the on-stage safety net. The demo replays this
 * deterministically; no live API call is required. Synced from /data via `npm run sync:contract`.
 */
export const marriageLicenseRun = raw as unknown as GoldenRun;
