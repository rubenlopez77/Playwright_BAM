/**
 * ESLint config for BAM Test Suites
 * Aplica reglas específicas para los tests declarativos
 * - Enforce pattern: const user = this.getPage(Class);
 * - Sin await ni async
 * - Solo llamadas a user.metodo() y expect()
 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'bam-ux'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  ignorePatterns: ['node_modules', 'dist'], 
  rules: {
    //  Enforce Declarative Test Pattern
    'bam-ux/test-enforce-pattern': ['error'],

    // Ajustes de estilo opcionales
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off',
  },
};
