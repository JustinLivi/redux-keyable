module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['jest-extended'],
  coverageThreshold: {
    global: {
      statements: 99,
      lines: 90,
      functions: 90,
      branches: 50
    }
  },
  globals: {
    'ts-jest': {
      diagnostics: {
        // match any file except tests
        pathRegex: '^((?!\\.test\\.ts).)*$'
      }
    }
  }
};
