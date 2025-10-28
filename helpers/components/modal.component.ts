// helpers/components/modal.component.ts
import { expect } from '@playwright/test';
import { BaseHelper } from '../../support/baseHelper';
import { logger } from '../../support/logger';

export class ModalComponent extends BaseHelper {
  private readonly modalSelector = '.modal';
  private readonly closeBtn = 'button.close';

  /**
   * Cierra el modal si está visible
   */
  async close(): Promise<void> {
    logger.info('🧩 Cerrando modal...');
    await this.page.click(this.closeBtn);
    await expect(this.page.locator(this.modalSelector)).toBeHidden();
    logger.info('✅ Modal cerrado correctamente.');
  }

  /**
   * Verifica que el modal esté visible
   */
  async expectVisible(): Promise<void> {
    logger.info('🔎 Verificando visibilidad del modal...');
    await expect(this.page.locator(this.modalSelector)).toBeVisible();
    logger.info('✅ Modal visible en pantalla.');
  }
}

