import { Given, When, Then } from '@cucumber/cucumber';

Given('el usuario abre la página principal', function () {
  this.pages.login.open();
});

When('realiza login con credenciales válidas', function () {
  this.pages.login.login(process.env.LOGIN!, process.env.PASS!);
});

Then('debería ver su nombre en la barra superior', function () {
  this.pages.login.expectLoggedIn();
});
