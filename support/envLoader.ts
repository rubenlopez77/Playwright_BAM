import { logger } from './logger';
import * as dotenv from 'dotenv';
import * as path from 'path';


(() => {
  const envName = process.env.ENV ?? 'qa';
  const envFile = path.resolve(process.cwd(), `.env.${envName}`);

  const result = dotenv.config({ path: envFile });

  if (result.error) {
    console.warn(`⚠️ No se pudo cargar el archivo ${envFile}:`, result.error.message);
  } else {
    const vars = Object.keys(result.parsed || {});
    logger.info(`🌍 Entorno cargado: ${envName} (${envFile})`);
    logger.info(`→ Variables cargadas: ${vars.join(', ')}`);
  }
})();
