import { CustomWorld } from '../support/world';
import { ModalComponent } from '../components/modal.component';
import { TextboxComponent } from '../components/textbox.component';

export class LoginPage {
  private world: CustomWorld;
  private modal: ModalComponent;
  private username: TextboxComponent;
  private password: TextboxComponent;

  constructor(world: CustomWorld) {
    this.world = world;
    this.modal = new ModalComponent(world, '#login2', 'LoginModal');
    this.username = new TextboxComponent(world, '#loginusername', 'UsernameField');
    this.password = new TextboxComponent(world, '#loginpassword', 'PasswordField');
  }

  openLoginModal() {
    this.modal.open();
  }

  loginWith(username: string, password: string) {
    this.openLoginModal();
    this.username.fill(username);
    this.password.fill(password);
    this.world.enqueue(async () => {
      await this.world.page.click('button[onclick="logIn()"]');
      await this.world.page.waitForSelector('#nameofuser', { state: 'visible' });
    });
  }

  expectLoggedIn(username?: string) {
    this.world.enqueue(async () => {
      const userText = await this.world.page.textContent('#nameofuser');
      if (username && !userText?.includes(username)) {
        throw new Error(`Expected username "${username}" but found "${userText}"`);
      }
    });
  }
}
