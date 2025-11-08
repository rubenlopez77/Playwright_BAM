

/**
 * Dynamically choose Cucumber formatter:
 * - LOG=true  → progress (BAM logs)
 * - LOG=false → pretty (readable Given/When/Then)
 */
import 'ts-node/register';

const LOG = process.env.LOG === 'true';

export default {
  format: LOG ? ['progress'] : ['progress-bar'],
  require: ['tests/**/*.ts'],
  publishQuiet: true,
};
