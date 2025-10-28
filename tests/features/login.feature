Feature: Login de usuario

  Como usuario registrado de la tienda
  Quiero poder iniciar sesión en la página principal
  Para acceder a mi cuenta y ver mi nombre en la barra superior

  Scenario: Iniciar sesión con credenciales válidas
    Given el usuario abre la página principal
    When realiza login con credenciales válidas
    Then debería ver su nombre en la barra superior
