/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
  coverageProvider: 'v8',
  roots: ['<rootDir>/src/__test__'],
  testEnvironment: 'jest-environment-node',
  preset: 'ts-jest',
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/']
}
