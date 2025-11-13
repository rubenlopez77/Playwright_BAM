import { ExecutionContext } from '../support/execution-context';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';
import { ButtonComponent } from '../components/button.component';
import { AlertComponent } from '../components/alert.component';
import { CredentialSet } from '../data/credentials.data';
import { LoginLocators } from '../ux/login.ux'; 

import { WaitComponent } from '../components/wait.component';

export class LoginPage {
  private readonly context: ExecutionContext;
  private readonly modal: ModalComponent;
  private readonly loginButton: ButtonComponent;
  private readonly username: TextboxComponent;
  private readonly password: TextboxComponent;
  private readonly userDisplay: WaitComponent;
  private readonly submitButton: ButtonComponent;




  constructor(context: ExecutionContext) {
    this.context = context;
    this.loginButton = new ButtonComponent(context, LoginLocators.LOGIN_BUTTON.selector, 'Loginbutton');
    this.modal = new ModalComponent(context, LoginLocators.MODAL.selector, 'LoginModal');
    this.username = new TextboxComponent(context, LoginLocators.USERNAME.selector, 'UsernameField');
    this.password = new TextboxComponent(context, LoginLocators.PASSWORD.selector, 'PasswordField');
    this.userDisplay = new WaitComponent(context, LoginLocators.USER_DISPLAY.selector, 'UserDisplay');
    this.submitButton = new ButtonComponent(context, LoginLocators.SUBMIT.selector, 'SubmitButton');
   
  }


  // Acción de login
  loginWith(set: CredentialSet) {
    this.loginButton.click();
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
    const alert = new AlertComponent(this.context, '', 'Alert');
    alert.expectTexts('Wrong password');
  }
}
