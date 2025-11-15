/**
 * Formatter  logic
 *
 * 1) Si LOG = true  → SIEMPRE 'progress'
 *      - Prioriza logs limpios y evita pretty.
 *
 * 2) Si LOG = false y WORKERS > 1 → 'progress'
 *      - En paralelo pretty se mezcla; progress es la opción estable.
 *
 * 3) Si LOG = false y WORKERS = 1 → '@cucumber/pretty-formatter'
 *      - Solo en modo single sin LOG usamos pretty para ver los steps ordenados.
 *
 */
require('ts-node/register');
const { EnvConfig } = require('./support/env');
const isParallel = Number(EnvConfig.WORKERS || 1) > 1;
let formatter;

if (EnvConfig.LOG) {
  formatter = 'progress';
}
else if (isParallel) {
  formatter = 'progress';
}
else {
  formatter = '@cucumber/pretty-formatter';
}

module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'support/world.ts',
      'support/hooks.ts',
      'support/logger/scenario.logger.ts',
      'steps/**/*.ts'
    ],
    format: [formatter],
    parallel: EnvConfig.WORKERS
  }
};
