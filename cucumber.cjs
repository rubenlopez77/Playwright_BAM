const isLogging = process.env.LOG === 'true';
const isCI = process.env.CI === 'true';

module.exports = {
  default: {
    require: [
      'tests/steps/**/*.ts',
      'support/**/*.ts'
    ],
    requireModule: [
      'ts-node/register',
      'tsconfig-paths/register'
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
      isCI
        ? 'progress'
        : isLogging
        ? 'progress' // Modo con logs → puntos + logs
        : '@cucumber/pretty-formatter' // Modo sin logs → muestra Given/When/Then
    ]
  }
};
