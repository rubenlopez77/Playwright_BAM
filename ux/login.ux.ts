import { UxElement } from '../ux/ux-element';

/**
 * UX Map: Login Page
 * Artefacto declarativo que describe los elementos del flujo de login.
 */
export const LoginLocators = {
  LOGIN_BUTTON: { selector: '#login2', type: 'button', description: 'Botón de Logín' },
  MODAL: { selector: '#logInModal', type: 'modal' , description: 'Log in modal'},
  USERNAME: { selector: '#loginusername', type: 'textbox' , description: 'Username'},
  PASSWORD: { selector: '#loginpassword', type: 'textbox' , description: 'Password'},
  SUBMIT: { selector: 'button[onclick="logIn()"]', type: 'button' , description: 'Log in'},
  USER_DISPLAY: { selector: '#nameofuser', type: 'user-info' , description: 'Welcome {user}'},
} satisfies Record<string, UxElement>; 