// scripts/validate-bms.ts
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";

import { parseFeature } from "./validate-bms/gherkin-parser";
import { validateFeatureTags } from "./validate-bms/rules";

// ------------------------------------------------------------
// Recursively collect all .feature files
// ------------------------------------------------------------
function getAllFeatureFiles(dir: string): string[] {
  let results: string[] = [];

  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      results = results.concat(getAllFeatureFiles(fullPath));
    } else if (item.isFile() && fullPath.endsWith(".feature")) {
      results.push(fullPath);
    }
  }

  return results;
}

async function main() {
  const strict = process.env.BMS_STRICT === "true";

  // 1) If user passed arguments → validate those
  let featureFiles = process.argv.slice(2).filter(f => f.endsWith(".feature"));

  // 2) If user passed nothing → auto-detect features/
  if (featureFiles.length === 0) {
    const defaultDir = path.resolve("features");
    if (fs.existsSync(defaultDir)) {
      featureFiles = getAllFeatureFiles(defaultDir);
    }
  }

  // Still empty → no features found
  if (featureFiles.length === 0) {
    console.log(chalk.yellow("No feature files found under ./features or via CLI arguments."));
    process.exit(0);
  }

  let totalErrors = 0;

  for (const file of featureFiles) {
    const abs = path.resolve(file);
    const doc = parseFeature(abs);
    const errors = validateFeatureTags(doc);

    if (errors.length === 0) {
      console.log(chalk.green(`[BMS] ${abs} ✓ Validation passed`));
      continue;
    }

    totalErrors += errors.length;

    console.log(chalk.red(`[BMS] ${abs} ✗ Validation failed`));
    for (const e of errors) {
      console.log(chalk.red(`  ✘ [${e.type}] Line ${e.line}: ${e.message}`));
    }
  }

  if (totalErrors > 0 && strict) {
    console.log(
      chalk.red(`\n[BMS-STRICT] Validation failed with ${totalErrors} error(s). Exiting with code 1.\n`)
    );
    process.exit(1);
  }
}

main().catch(err => {
  console.error(chalk.red("Unexpected BMS Validator error:\n"), err);
  process.exit(1);
});
