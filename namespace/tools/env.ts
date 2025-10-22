import dotenv from 'dotenv';
import path from 'path';

type EnvVars = {
  BASE_URL: string;
  LOGIN: string;
  PASS: string;
};

const ENV = process.env.PLAYWRIGHT_ENV || 'QA'; // Por defecto QA
const envFile = path.resolve(process.cwd(), `.env.${ENV.toLowerCase()}`);


dotenv.config({ path: envFile });

const envVars: EnvVars = {
  BASE_URL: process.env.BASE_URL || '',
  LOGIN: process.env.LOGIN || '',
  PASS: process.env.PASS || ''
};

export default envVars;
