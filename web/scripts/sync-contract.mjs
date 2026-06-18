// Re-sync the frozen contract + golden run from the repo's source of truth into the web app.
// Run after Valerie updates /shared or commits new /data golden runs:  npm run sync:contract
import { copyFileSync, mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url)); // web/scripts
const repo = resolve(here, "..", ".."); // repo root
const web = resolve(here, ".."); // web

const copies = [
  [
    resolve(repo, "shared/governanceModel.ts"),
    resolve(web, "src/lib/governanceModel.ts"),
  ],
  [
    resolve(repo, "data/marriage-license/golden-run.sample.json"),
    resolve(web, "src/data/marriageLicenseGoldenRun.json"),
  ],
  [
    resolve(repo, "data/business-license/comparison.sample.json"),
    resolve(web, "src/data/businessLicenseComparison.json"),
  ],
];

for (const [from, to] of copies) {
  mkdirSync(dirname(to), { recursive: true });
  copyFileSync(from, to);
  console.log(`synced  ${from}\n     -> ${to}`);
}
