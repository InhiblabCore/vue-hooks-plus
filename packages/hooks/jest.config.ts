import { InitialOptionsTsJest } from 'ts-jest'

const config: InitialOptionsTsJest = {
	preset: 'ts-jest',
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
	modulePathIgnorePatterns: ['<rootDir>/package.json'],
	collectCoverageFrom: ['src/**/*.ts'],
	moduleNameMapper: {
		'^lodash-es$': 'lodash',
	},
	globals: {
		'ts-jest': {
			tsconfig: 'tsconfig.json',
		},
	},
}

export default config
