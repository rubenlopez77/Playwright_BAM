import { expect, Page, Locator } from '@playwright/test';
import { ToolsTexts } from '../tools/texts';



export enum MenuOptions {
    Home = 'Home',
    Contact = 'Contact',
    Aboutus = 'About us',
    Cart = 'Cart',
    Login = 'Log in',
    Signup = 'Sign up',
    Logout = 'Log out',
}

  export class Menu {
    private readonly page: Page;
    private readonly menuElement: Locator;

    constructor(page: Page) {
      this.page = page;
      this.menuElement = this.page.locator('#navbarExample')

    } 
    
    /// <summary>           
    /// Valida que las opciones del menú sean las esperadas
    /// </summary>    
    public async validateMenu(): Promise<void> {
    const navItemTexts = await this.menuElement.locator('.nav-item:visible').allInnerTexts();

    const menuOptionsValues = Object.values(MenuOptions) as string[]; 

    //await new ToolsDebug(this.page).screenshot(this.page); Desactivado
    const tt = new ToolsTexts()

    // TODO: Deberia cambiar el menu si es logado o no. de momento asi
    for (const text of navItemTexts) {
        expect(menuOptionsValues).toContain(await tt.cleanText(text))
      
    }
  }
    public async goMenu(menu: MenuOptions): Promise<void> {
    
     await this.page.locator('.navbar-nav').getByRole('link', { name: menu}).click(); 

  }
  

      // public async isLogged(user: string=""): Promise<boolean> {


      //   if (user != '')
      //   {
      //     const userElement = this.page.locator('#nameofuser');
      //     await expect(userElement).toBeVisible(); // asegura que el elemento esté en el DOM
        
      //     const userText = await userElement.textContent();
      //     return userText === `Welcome ${user}`;

      //   } else {

      //     await expect(this.menuElement).toBeVisible(); // asegura que el elemento esté en el DOM
          
      //     const element = this.page.locator('#nameofuser');
      //     return (await element.isVisible().catch(() => false));

      //   }
  
    

    

      // }

}

    


      





