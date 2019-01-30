const { defaults } = require('jest-config');

module.exports = {
  moduleNameMapper: {
    '@((?!babel|sinonjs).*)$': '<rootDir>/app/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  cacheDirectory: '/tmp/jest',
  moduleDirectories: ['node_modules'],
  setupTestFrameworkScriptFile: './test/initializer.js', // run this file before running test
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
