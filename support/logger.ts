/* support/logger.ts */
import chalk from 'chalk';

const isLoggingEnabled = process.env.LOG === 'true';

export const logger = {
  info: (msg: string) => {
    if (isLoggingEnabled) console.log(chalk.cyan(msg));
  },
  warn: (msg: string) => {
    if (isLoggingEnabled) console.log(chalk.yellow(msg));
  },
  error: (msg: string) => {
    if (isLoggingEnabled) console.log(chalk.red(msg));
  },
  success: (msg: string) => {
    if (isLoggingEnabled) console.log(chalk.green(msg));
  },
};
