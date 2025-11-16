import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "node:fs";
import path from "node:path";

const ajv = new Ajv({
  allErrors: true,
  verbose: true,
  strictSchema: false,
  strictTypes: false,
  strictTuples: false,
  strictRequired: false
});

addFormats(ajv);

// Load schema
const schemaPath = path.resolve(__dirname, "../schemas/bam.schema.min.json");
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
const validate = ajv.compile(schema);

// Validate 1 report
function validateReport(filePath: string): boolean {
  const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const valid = validate(data);

  if (!valid) {
    console.log("------------------------------------------------------");
    console.log(`❌ INVALID REPORT → ${filePath}`);
    console.log("Errors:");
    console.log(JSON.stringify(validate.errors, null, 2));
    console.log("------------------------------------------------------");
    return false;
  }

  console.log(`✔ VALID REPORT → ${filePath}`);
  return true;
}

// Validate all reports
function main() {
  const reportsDir = path.resolve(__dirname, "../reports");

  if (!fs.existsSync(reportsDir)) {
    console.error("⚠ No reports directory found.");
    process.exit(1);
  }

  const files = fs.readdirSync(reportsDir).filter(f => f.endsWith(".json"));

  if (files.length === 0) {
    console.log("⚠️ No JSON reports found in /reports.");
    return;
  }

  console.log("🔍 Validating BAM reports...");
  console.log(`Found ${files.length} report(s).`);
  console.log("");

  let allValid = true;

  for (const file of files) {
    const fullPath = path.join(reportsDir, file);
    const valid = validateReport(fullPath);
    if (!valid) allValid = false;
  }

  console.log("");
  console.log("------------------------------------------------------");
  if (allValid) {
    console.log("✅ All BAM reports are valid according to schema.");
  } else {
    console.log("❌ One or more BAM reports failed validation.");
    process.exit(1);
  }
  console.log("------------------------------------------------------");
}

main();
