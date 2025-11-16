
Feature: Login

  @id:TC001
  @title:Invalid_login_shows_error_message
  @description:Checks_system_response_to_invalid_credentials

  Scenario: Unuccessful login
    Given the user opens the home page
    When the user logs in with invalid credentials
    Then the user should see login error message
  
  @id:TC002
  @title:Valid_login_shows_username
  @description:Checks_successful_authentication  
  @debug
  Scenario: Successful login
    Given the user opens the home page
    When the user logs in with valid credentials
    Then the user should see his name in the top bar

