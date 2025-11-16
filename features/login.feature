Feature: Login
  The system must allow valid users to authenticate and reject invalid credentials.

  @ID=TC-005
  @Title=Login_fails_with_invalid_credentials
  @Description=User_enters_invalid_credentials_and_receives_an_error_message
  @MODULE=Authentication
  @COMPONENT=Login
  @PRE=User_not_authenticated
  @AC1=Login_modal_should_disappear
  @AC2=Error_message_should_be_displayed
  @DATA=credentials.invalid
  @PRIORITY=HIGH
  @RISK=MEDIUM
  Scenario: Unsuccessful login
    Given the user opens the home page
    When the user logs in with invalid credentials
    Then the user should see login error message


  @ID=TC-002
  @Title=Valid_login_shows_username
  @Description=Valid_user_logs_in_and_sees_his_name_in_the_navbar
  @MODULE=Authentication
  @COMPONENT=Login
  @PRE=User_not_authenticated
  @AC1=Welcome_message_includes_username
  @AC2=Login_modal_should_disappear_after_success
  @DATA=credentials.valid
  @PRIORITY=HIGH
  @RISK=LOW
  @LABEL=DEBUG
  Scenario: Successful login
    Given the user opens the home page
    When the user logs in with valid credentials
    Then the user should see his name in the top bar
