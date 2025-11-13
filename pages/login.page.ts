import { ExecutionContext } from '../support/execution-context';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';
import { CredentialSet } from '../data/credentials.data';
import { LoginLocators } from '../ux/login.ux'; 

import { WaitComponent } from '../components/wait.component';

export class LoginPage {
  private readonly world: ExecutionContext;
  private readonly modal: ModalComponent;
  private readonly username: TextboxComponent;
  private readonly password: TextboxComponent;
  private readonly userDisplay: WaitComponent;
  private readonly submitButton: ButtonComponent;



  constructor(context: ExecutionContext) {
    this.world = context;
    this.modal = new ModalComponent(context, LoginLocators.OPEN_BUTTON.selector, 'LoginModal');
    this.username = new TextboxComponent(context, LoginLocators.USERNAME.selector, 'UsernameField');
    this.password = new TextboxComponent(context, LoginLocators.PASSWORD.selector, 'PasswordField');
    this.userDisplay = new WaitComponent(context, LoginLocators.USER_DISPLAY.selector, 'UserDisplay');
    this.submitButton = new ButtonComponent(context, LoginLocators.SUBMIT.selector, 'SubmitButton');
   
  }

  openLoginModal() {
    this.modal.open();
  }
  // Acción de login
  loginWith(set: CredentialSet) {
    this.openLoginModal();
    this.username.fill(set.username);
    this.password.fill(set.password);
    this.submitButton.click();
  }

  // Verifica que el usuario está logueado 
  expectLoggedIn(username?: string) {

    this.userDisplay.waitForText(username);
    this.userDisplay.waitForNonEmptyText();

  }
  // Espera que aparezca un alert con mensaje de error 
  expectLogError() {
    const alert = new AlertComponent(this.world, '', 'Alert');
    alert.expectTexts('Wrong password');
  }
}
