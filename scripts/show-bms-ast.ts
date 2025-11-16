// scripts/show-bms-ast.ts
/* eslint-disable no-console */
import fs from "node:fs";
import path from "node:path";
import { parseGherkinDocument } from "./validate-bms/gherkin-parser";

function getAllFeatureFiles(rootDir: string): string[] {
  const result: string[] = [];

  function walk(dir: string): void {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.isFile() && full.toLowerCase().endsWith(".feature")) {
        result.push(full);
      }
    }
  }

  walk(rootDir);
  return result;
}

function main(): void {
  const root = path.resolve(process.cwd(), "features");
  const files = getAllFeatureFiles(root);

  if (files.length === 0) {
    console.log("No .feature files found under ./features");
    return;
  }

  for (const file of files) {
    const content = fs.readFileSync(file, "utf-8");
    const ast = parseGherkinDocument(content, file);

    console.log("========================================");
    console.log(`FILE: ${ast.file}`);
    console.log(`Feature: ${ast.featureName}`);
    console.log("Scenarios:");
    console.log(JSON.stringify(ast.scenarios, null, 2));
    console.log("========================================\n");
  }
}

main();
