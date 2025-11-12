/**
 * UXMap Validator (BAM v1.2)
 * Valida:
 *  - Selectores duplicados
 *  - Tipos inválidos
 *  - Selectores vacíos
 */

import fs from 'fs';
import path from 'node:path';
import { globSync } from 'glob';
import chalk from 'chalk';

const UX_PATH = path.resolve('ux/');
const VALID_TYPES = ['button', 'textbox', 'modal', 'user-info', 'link', 'checkbox', 'dropdown'];

interface ValidationError {
  file: string;
  message: string;
  element?: string;
}

const errors: ValidationError[] = [];
const selectors = new Map<string, string>();
const files = globSync(`${UX_PATH}/**/*.ux.ts`);

for (const file of files) {
  const content = fs.readFileSync(file, 'utf-8');
  const regex = /\{\s*selector:\s*['"]([^'"]+)['"]\s*,\s*type:\s*['"]([^'"]+)['"]\s*\}/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content))) {
    const [, selector, type] = match;

    if (selectors.has(selector)) {
      errors.push({
        file,
        element: selector,
        message: `Selector duplicado: "${selector}" (ya definido en ${selectors.get(selector)})`
      });
    } else {
      selectors.set(selector, file);
    }

    if (!VALID_TYPES.includes(type)) {
      errors.push({
        file,
        element: selector,
        message: `Tipo inválido "${type}". Válidos: ${VALID_TYPES.join(', ')}`
      });
    }

    if (!selector.trim()) {
      errors.push({ file, message: 'Selector vacío detectado' });
    }
  }
}

if (errors.length > 0) {
  console.error(chalk.red(`\n❌ UXMap Validation failed with ${errors.length} issue(s):\n`));
  for (const e of errors) {
    console.error(`• ${chalk.yellow(e.file)} → ${e.message}${e.element ? chalk.gray(` [${e.element}]`) : ''}`);
  }
  fs.writeFileSync('reports/ux-validation-report.json', JSON.stringify(errors, null, 2));
  process.exit(1);
} else {
  console.log(chalk.green(`\n✅ UXMap validation passed for ${files.length} file(s).`));
  fs.writeFileSync('reports/ux-validation-report.json', JSON.stringify({ result: 'ok' }, null, 2));
}
