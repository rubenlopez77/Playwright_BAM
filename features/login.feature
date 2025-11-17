Feature: Login

  Scenario: Unuccessful login
    Given the user opens the home page
    When the user logs in with invalid credentials
    Then the user should see login error message
  
  @debug
  Scenario: Successful login
    Given the user opens the home page
    When the user logs in with valid credentials
    Then the user should see his name in the top bar

