import * as types from './utils/typesCheck'

export type DataType = keyof Omit<
	typeof types,
	'objectToString' | 'toTypeString'
>
