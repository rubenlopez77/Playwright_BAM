import { ExecutionContext } from '../support/execution-context';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';
import { BaseComponent } from '../components/base.component';
import { ButtonComponent } from '../components/button.component';
import { CredentialSet } from '../data/credentials.data';

export const LoginLocators = {
  OPEN_BUTTON: { selector: '#login2', type: 'button' } as const,
  MODAL: { selector: '#logInModal', type: 'modal' } as const,
  USERNAME: { selector: '#loginusername', type: 'textbox' } as const,
  PASSWORD: { selector: '#loginpassword', type: 'textbox' } as const,
  SUBMIT: { selector: 'button[onclick="logIn()"]', type: 'button' } as const,
  USER_DISPLAY: { selector: '#nameofuser', type: 'user-info' } as const,
} as const;

export class LoginPage {
  private readonly world: ExecutionContext;
  private readonly modal: ModalComponent;
  private readonly username: TextboxComponent;
  private readonly password: TextboxComponent;
  private readonly userDisplay: BaseComponent;
  private readonly submitButton: ButtonComponent;


  constructor(world: ExecutionContext) {
    this.world = world;
    this.modal = new ModalComponent(world, LoginLocators.OPEN_BUTTON.selector, 'LoginModal');
    this.username = new TextboxComponent(world, LoginLocators.USERNAME.selector, 'UsernameField');
    this.password = new TextboxComponent(world, LoginLocators.PASSWORD.selector, 'PasswordField');
    this.userDisplay = new TextboxComponent(world, LoginLocators.USER_DISPLAY.selector, 'UserDisplay');
    this.submitButton = new ButtonComponent(world, LoginLocators.SUBMIT.selector, 'SubmitButton');
  }

  openLoginModal() {
    this.modal.open();
  }


  loginWith(set: CredentialSet) {
    this.openLoginModal();
    this.username.fill(set.username);
    this.password.fill(set.password);

    this.submitButton.click();
    this.userDisplay.waitForNonEmptyText(); 
  }

  // Verifica que el usuario está logueado 
  expectLoggedIn(username?: string) {
    const displaySelector = LoginLocators.USER_DISPLAY.selector;
    const verifier = new (class extends BaseComponent {})(this.world, displaySelector, 'UserDisplay');
    verifier.waitForText(username ?? '');
    
  }
}
