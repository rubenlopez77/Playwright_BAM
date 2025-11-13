import { WaitComponent } from './wait.component';

export class ModalComponent extends WaitComponent {
  /**
   * Abre el modal y espera a que esté visible en la página.
   * Se apoya en waitVisible() heredado de GenericComponent.
   */
  click() {
    this.execute('open', async (page) => {
      await page.click(this.selectorValue);
    });

    this.waitVisible(); 
  }
}
