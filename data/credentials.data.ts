import { EnvConfig } from '../support/env';

export interface CredentialSet {
  username: string;
  password: string;
  description?: string;
}

/**
 * Capa de datos del dominio "credenciales"
 * Permite ejecutar tests semánticos:
 *   user.loginWith(credentials.valid)
 *   user.loginWith(credentials.invalid)
 */
export const credentials = {
  /** Credenciales válidas tomadas del entorno (.env.qa o .env.pro) */
  valid: {
    username: EnvConfig.LOGIN,
    password: EnvConfig.PASS,
    description: 'Valid user loaded from environment',
  } as CredentialSet,

  /** Usuario administrador con permisos completos */
  admin: {
    username: 'admin_master',
    password: 'root123',
    description: 'Administrative account with full privileges',
  } as CredentialSet,

  /** Usuario con permisos limitados (no acceso total) */
  limited: {
    username: 'limited_user',
    password: 'limited123',
    description: 'Restricted access account',
  } as CredentialSet,

  /** Credenciales incorrectas para pruebas de fallo de login */
  invalid: {
    username: 'invalid_user',
    password: 'wrong_pass',
    description: 'Invalid credentials for negative login test',
  } as CredentialSet,
};

