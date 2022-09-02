import { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  transformIgnorePatterns: ['/node_modules/(?!my-package)(.*)'],
  modulePathIgnorePatterns: ['<rootDir>/package.json'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}

export default config
