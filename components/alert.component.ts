import { BaseComponent } from './base.component';

export class AlertComponent extends BaseComponent {
  /**
   * Espera un alert nativo del navegador y valida que su texto
   * contenga alguno de los patrones esperados (case-insensitive).
   * Permite múltiples textos válidos.
   */
  expectTexts(expected: string | string[]) {
    this.run(`expectTexts(${expected})`, async (page) => {
      const dialog = await page.waitForEvent('dialog', { timeout: 5000 });
      const message = dialog.message().trim().toLowerCase();

      const patterns = Array.isArray(expected)
        ? expected.map(e => e.trim().toLowerCase())
        : [expected.trim().toLowerCase()];

      const match = patterns.some(p => message.includes(p));

      if (!match) {
        const expectedList = patterns.join('", "');
        throw new Error(
          `Unexpected alert message.\nExpected to include: "${expectedList}"\nReceived: "${dialog.message()}"`
        );
      }

      await dialog.accept();
    });
  }
}
