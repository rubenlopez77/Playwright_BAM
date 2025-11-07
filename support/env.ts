import * as dotenv from 'dotenv';
import path from 'path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.pro' : '.env.qa';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const EnvConfig = {
  BASE_URL: process.env.BASE_URL || 'about:blank',
  LOGIN: process.env.LOGIN || 'admin',
  PASS: process.env.PASS || 'admin',
  HEADLESS: process.env.HEADLESS === 'true',
  BROWSER: process.env.BROWSER || 'chromium',
  TRACE: process.env.TRACE === 'on',
  CUCUMBER_TIMEOUT: Number(process.env.CUCUMBER_TIMEOUT || 60000),
  LOG: process.env.LOG === 'true',
};
