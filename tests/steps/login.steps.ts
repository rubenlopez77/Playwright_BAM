import { Given, When, Then } from '@cucumber/cucumber';


Given('el usuario abre la página principal', function () {
  this.user.goHome();
});

When('realiza login con credenciales válidas', function () {
  this.user.loginWith(process.env.LOGIN!, process.env.PASS!);
});

Then('debería ver su nombre en la barra superior', function () {
  this.user.expectLoggedIn();
});
