// jest.config.js
// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '@app/alpha/(.*)': '<rootDir>/apps/alpha/src/$1',
    '@app/alpha': '<rootDir>/apps/alpha/src',
    '@app/beta/(.*)': '<rootDir>/apps/beta/src/$1',
    '@app/beta': '<rootDir>/apps/beta/src',
    '@app/common/(.*)': '<rootDir>/libs/common/src/$1',
    '@app/common': '<rootDir>/libs/common/src',
  },
  setupFilesAfterEnv: ['jest-extended', './libs/common/tests/setup.testing.ts'],
  reporters: ['default', 'jest-junit'],
};
