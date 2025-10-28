import fs from 'fs';
import path from 'path';
import { logger } from './logger';

export class PageFactory {
  [key: string]: any; // 👈 permite propiedades dinámicas sin que TS proteste

  constructor(private page: any) {
    const pagesDir = path.resolve(__dirname, '../helpers/pages');

    if (!fs.existsSync(pagesDir)) {
      throw new Error(`❌ No se encontró el directorio de páginas: ${pagesDir}`);
    }

    const files = fs
      .readdirSync(pagesDir)
      .filter((f) => f.endsWith('.ts') || f.endsWith('.js'));

    if (process.env.LOG === 'true') {
      logger.info(`📦 Cargando páginas desde: ${pagesDir}`);
    }

    for (const file of files) {
  // ⬇️ Quita primero ".page.<ext>" si existe; si no, quita solo ".<ext>"
  const baseName =
    file.replace(/\.page\.(ts|js)$/i, '')      // "login.page.ts" -> "login"
        .replace(/\.(ts|js)$/i, '');           // "home.ts" -> "home"

  const instanceName = baseName.toLowerCase(); // "Login" -> "login"

  const filePath = path.join(pagesDir, file);
  try {
    const mod = require(filePath);
    const PageClass = Object.values(mod).find(exp => typeof exp === 'function');
    if (!PageClass) {
      logger.warn(`⚠️ ${file} no exporta ninguna clase válida.`);
      continue;
    }

    (this as any)[instanceName] = new (PageClass as any)(this.page);

    if (process.env.LOG === 'true') {
      logger.info(`✅ Página cargada: ${instanceName} (de ${file})`);
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    logger.warn(`⚠️ No se pudo cargar ${file}: ${msg}`);
  }
}
  }
}

