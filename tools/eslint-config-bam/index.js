/**
 * ESLint Config BAM
 * Preset común que aplica las reglas BAM UX y Test Pattern
 */

module.exports = {
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'bam-ux'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  rules: {
    // 🧩 Validaciones BAM UX
    'bam-ux/uxmap-valid': ['error'],

    // 💡 Ajustes base
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'off'
  }
};
