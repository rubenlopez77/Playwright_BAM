// tests/support/pageFactory.ts
import * as fs from 'fs';
import * as path from 'path';
import type { Page } from '@playwright/test';

// Un constructor de página que opcionalmente expone un método estático wrap(page)
interface PageCtor<T = any> {
  new (page: Page): T;
  wrap?: (page: Page) => T; // 👈 estático opcional
}

export class PageFactory {
  // Permite asignación dinámica (login, home, etc.)
  [key: string]: any;

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
    this.loadPages();
  }

  private loadPages() {

    const pagesDir = path.resolve(__dirname, '../helpers/pages');


    // Acepta *.page.ts y *.page.js (funciona en ts-node y en dist)
    const files = fs.readdirSync(pagesDir).filter(f => /\.page\.(ts|js)$/.test(f));

    for (const file of files) {
      const propName = file.replace(/\.page\.(ts|js)$/, '');
      const modPath = path.join(pagesDir, file);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const mod = require(modPath);

      // Toma la primera exportación como clase de página
      const exportedKey = Object.keys(mod)[0];
      const PageClass = mod[exportedKey] as PageCtor;

      if (typeof PageClass !== 'function') {
        console.warn(`⚠️ No se encontró un constructor de clase en ${file}. Saltando.`);
        continue;
      }

      // Si la clase tiene BaseHelper.wrap estático, úsalo; si no, instancia normal
      this[propName] = typeof PageClass.wrap === 'function'
        ? PageClass.wrap(this.page)
        : new PageClass(this.page);
    }
  }
}
