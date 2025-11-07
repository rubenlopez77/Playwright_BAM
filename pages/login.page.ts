import { CustomWorld } from '../support/world';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';
import { BaseComponent } from '../components/base.component';
import { credentials, CredentialSet } from '../data/credentials.data';

export const LoginLocators = {
  OPEN_BUTTON: { selector: '#login2', type: 'button' } as const,
  MODAL: { selector: '#logInModal', type: 'modal' } as const,
  USERNAME: { selector: '#loginusername', type: 'textbox' } as const,
  PASSWORD: { selector: '#loginpassword', type: 'textbox' } as const,
  SUBMIT: { selector: 'button[onclick="logIn()"]', type: 'button' } as const,
  USER_DISPLAY: { selector: '#nameofuser', type: 'user-info' } as const,
} as const;

export class LoginPage {
  private readonly world: CustomWorld;
  private readonly modal: ModalComponent;
  private readonly username: TextboxComponent;
  private readonly password: TextboxComponent;

  constructor(world: CustomWorld) {
    this.world = world;
    this.modal = new ModalComponent(world, LoginLocators.OPEN_BUTTON.selector, 'LoginModal');
    this.username = new TextboxComponent(world, LoginLocators.USERNAME.selector, 'UsernameField');
    this.password = new TextboxComponent(world, LoginLocators.PASSWORD.selector, 'PasswordField');
  }

  openLoginModal() {
    this.modal.open();
  }

  /** Realiza login utilizando un conjunto de credenciales */
  loginWith(set: CredentialSet) {
    this.openLoginModal();
    this.username.fill(set.username);
    this.password.fill(set.password);

    this.world.enqueue(async () => {
      const { page, logger } = this.world;
      const start = performance.now();

      await page.click(LoginLocators.SUBMIT.selector);

      // 🔹 Espera observable (no explícita): espera a que el elemento muestre contenido visible
      let success = false;
      try {
        await page.waitForFunction(
          (selector) => {
            const el = document.querySelector(selector);
            return !!(el && el.textContent && el.textContent.trim().length > 0);
          },
          LoginLocators.USER_DISPLAY.selector,
          { timeout: 3000 } // timeout controlado, no sleep
        );
        success = true;
      } catch {
        success = false;
      }

      const duration = performance.now() - start;
      logger.logAction(
        'LoginPage',
        `loginAttempt (${set.username})`,
        LoginLocators.SUBMIT.selector,
        duration,
        success
      );
      logger.logTiming('LoginPage', 'loginAttempt', duration, success);

      if (!success) {
        logger.logError(
          'LoginPage',
          'loginAttempt',
          new Error('Login timeout: user display not updated')
        );
      }
    });
  }

  /** Verifica que el usuario está logueado (espera texto dinámico visible) */
  expectLoggedIn(username?: string) {
    const displaySelector = LoginLocators.USER_DISPLAY.selector;
    const verifier = new (class extends BaseComponent {})(this.world, displaySelector, 'UserDisplay');
    verifier.waitForText(username ?? '');
    
  }
}
