/**
 * 🔧 ESLint Flat Config BAM v1.9 (VS Code-compatible)
 * Carga el plugin BAM-UX como módulo (desde node_modules)
 */

const tsParser = require('@typescript-eslint/parser');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const bamUx = require('eslint-plugin-bam-ux'); // 👈 ahora se resuelve como paquete

module.exports = [
  {
    ignores: ['dist/**', 'node_modules/**', '**/*.d.ts'],
  },

  // 🧩 1️⃣ Validación de UX Maps
  {
    files: ['pages/**/*.ux.ts'],
    languageOptions: { parser: tsParser },
    plugins: {
      'bam-ux': bamUx,
    },
    rules: {
      'bam-ux/uxmap-valid': 'error',
    },
  },

  // 🧪 2️⃣ Declarative Steps
  {
    files: ['steps/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: './tsconfig.json' },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      'bam-ux': bamUx,
    },
    rules: {
      // 💥 Reglas BAM declarativas
      'bam-ux/test-enforce-pattern': 'error',

      // ⚙️ TS base
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
];
