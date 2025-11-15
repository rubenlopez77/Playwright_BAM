import * as dotenv from 'dotenv';
import path from 'node:path';

const envFile = process.env.NODE_ENV === 'production' ? '.env.pro' : '.env.qa';
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

/**
 * Modelo único:
 * 
 * BROWSER puede ser:
 *   - Un navegador:    "chromium"
 *   - Varios:          "chromium,firefox,webkit"
 * 
 * Sin BROWSERS.
 */
const rawBrowser = process.env.BROWSER ?? 'chromium';

const browserList = rawBrowser
  .split(',')
  .map(b => b.trim())
  .filter(b => b.length > 0);

// El primero se usa como navegador principal (compatibilidad con el BAM actual)
const mainBrowser = browserList[0] ?? 'chromium';

// Número de workers = número de navegadores definidos
const workers = browserList.length || 1;

export const EnvConfig = {
  BASE_URL: process.env.BASE_URL ?? 'about:blank',
  LOGIN: process.env.LOGIN ?? 'admin',
  PASS: process.env.PASS ?? 'admin',
  HEADLESS: toBoolean(process.env.HEADLESS ?? 'true'),
  TRACE: toBoolean(process.env.TRACE ?? 'off'),
  CUCUMBER_TIMEOUT: Number(process.env.CUCUMBER_TIMEOUT ?? '5000'),
  LOG: toBoolean(process.env.LOG ?? 'true'),

  // Nuevo modelo unificado
  BROWSER: browserList,     // lista completa: ["chromium", "firefox"]
  MAIN_BROWSER: mainBrowser, // antes era EnvConfig.BROWSER original
  WORKERS: workers           // calculado automáticamente
};

/// Convierte varios formatos comunes a boolean para normalizar valores de entorno.
function toBoolean(value: any): boolean {
  if (!value) return false;

  const normalized = String(value).trim().toLowerCase();

  return (
    normalized === "true" ||
    normalized === "1" ||
    normalized === "yes" ||
    normalized === "y" ||
    normalized === "on"
  );
}