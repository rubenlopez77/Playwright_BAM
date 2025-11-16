// scripts/validate-bms.ts
import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { parseGherkinDocument } from "./validate-bms/gherkin-parser"; 
import { validateFeatureTags } from "./validate-bms/rules";
import { ValidationError } from "./validate-bms/types";

// --------------------------------------------------------
// CONFIG
// --------------------------------------------------------
const ROOT = path.resolve(process.cwd(), "features");
const IS_STRICT = process.env.BMS_STRICT === "true";

console.log(chalk.cyan(`\n[BMS] Starting BMS Validation (strict=${IS_STRICT})...\n`));

// --------------------------------------------------------
// FIND ALL .feature FILES
// --------------------------------------------------------
function getAllFeatureFiles(dir: string): string[] {
  const files = fs.readdirSync(dir);
  const result: string[] = [];

  for (const file of files) {
    const full = path.join(dir, file);
    const stats = fs.statSync(full);

    if (stats.isDirectory()) {
      result.push(...getAllFeatureFiles(full));
    } else if (file.toLowerCase().endsWith(".feature")) {
      result.push(full);
    }
  }

  return result;
}

const featureFiles = getAllFeatureFiles(ROOT);

if (featureFiles.length === 0) {
  console.warn(chalk.yellow("[BMS-WARN] No .feature files found under ./features"));
}

// --------------------------------------------------------
// VALIDATION
// --------------------------------------------------------
let errors: ValidationError[] = [];
let warnings: ValidationError[] = [];

for (const file of featureFiles) {
  const content = fs.readFileSync(file, "utf8");

  try {
    const doc = parseGherkinDocument(content, file);
    const result = validateFeatureTags(doc, file);

    errors.push(...result.errors);
    warnings.push(...result.warnings);

  } catch (err: any) {
    errors.push({
      file,
      line: 0,
      message: `Gherkin parse error: ${err.message}`,
    });
  }
}

// --------------------------------------------------------
// PRINT RESULTS
// --------------------------------------------------------

if (errors.length > 0) {
  console.error(chalk.redBright(`\n❌ [BMS] Found ${errors.length} error(s):\n`));

  errors.forEach(err => {
    console.error(
      chalk.redBright(
        `❌ [BMS-ERROR] ${err.file}:${err.line} ${err.message}`
      )
    );
  });

  console.error(
    chalk.redBright(`\n❌ [BMS] Validation failed with ${errors.length} error(s).\n`)
  );

  if (IS_STRICT) {
    process.exit(1);
  }
}

if (warnings.length > 0) {
  console.warn(chalk.yellow(`\n⚠️  [BMS] Found ${warnings.length} warning(s):\n`));

  warnings.forEach(w => {
    console.warn(
      chalk.yellow(
        `⚠️  [BMS-WARN] ${w.file}:${w.line} ${w.message}`
      )
    );
  });

  console.warn(chalk.yellow(`\n⚠️  [BMS] Validation passed with warnings.\n`));
}

if (errors.length === 0 && warnings.length === 0) {
  console.log(chalk.greenBright(`\n✅ [BMS] Validation passed without errors.\n`));
}

console.log(chalk.cyan(`[BMS] Finished.\n`));
