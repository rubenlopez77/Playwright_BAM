import { ExecutionContext } from '../support/execution-context';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';
import { CredentialSet } from '../data/credentials.data';
import { LoginLocators } from '../ux/login.ux'; 

import { WaitComponent } from '../components/wait.component';
export class LoginPage {
  constructor(
    private readonly context: ExecutionContext,
    private readonly loginButton = new ButtonComponent(context, LoginLocators.LOGIN_BUTTON.selector, 'LoginButton'),
    private readonly modal = new ModalComponent(context, LoginLocators.MODAL.selector, 'LoginModal'),
    private readonly username = new TextboxComponent(context, LoginLocators.USERNAME.selector, 'UsernameField'),
    private readonly password = new TextboxComponent(context, LoginLocators.PASSWORD.selector, 'PasswordField'),
    private readonly userDisplay = new WaitComponent(context, LoginLocators.USER_DISPLAY.selector, 'UserDisplay'),
    private readonly submitButton = new ButtonComponent(context, LoginLocators.SUBMIT.selector, 'SubmitButton'),
    private readonly alert = new AlertComponent(context)
  ) {}


  // Acción de login
  loginWith(set: CredentialSet) {
    this.loginButton.click();
    this.modal.waitVisible();
    this.username.fill(set.username);
    this.password.fill(set.password);
    this.submitButton.click();
  }

  // Verifica que el usuario está logueado 
  expectLoggedIn(username?: string) {

    this.modal.waitNotVisible();
    this.userDisplay.waitForNonEmptyText();
    this.userDisplay.waitForText(username); 

  }
  // Espera que aparezca un alert con mensaje de error 
  expectLogError() { 
    this.alert.expectModalText('Wrong password');
  }
}
