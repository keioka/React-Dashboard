const { defaults } = require('jest-config');

module.exports = {
  moduleNameMapper: {
    '@((?!babel|sinonjs|nivo|mapbox).*)$': '<rootDir>/app/$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|json)$': '<rootDir>/test/__mocks__/fileMock.js',
    "\\.(svg)$": "<rootDir>/test/__mocks__/svgMock.js",
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  coverageDirectory: './coverage',
  cacheDirectory: '/tmp/jest',
  moduleDirectories: ['node_modules'],
  setupTestFrameworkScriptFile: './test/initializer.js', // run this file before running test
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
};
