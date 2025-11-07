import { Given, When, Then } from '@cucumber/cucumber';
import { HomePage } from '../pages/home.page';
import { LoginPage } from '../pages/login.page';
import { credentials } from '../data/credentials.data';

Given('the user opens the home page', function () {
  const home = this.getPage(HomePage);
  home.goHome();
  home.expectLoaded();
});

When('the user logs in with valid credentials', function () {
  const user = this.getPage(LoginPage);
  user.loginWith(credentials.valid);
});

Then('the user should see his name in the top bar', function () {
  const user = this.getPage(LoginPage);
  user.expectLoggedIn(credentials.valid.username);
});
