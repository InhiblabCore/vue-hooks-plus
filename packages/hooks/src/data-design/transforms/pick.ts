import { Transforms } from '.'
import { pick } from 'lodash'
export interface PickOptions {
	fields?: string[]
}

Transforms.registerTransform(
	'pick',
	(dataSource: any[], options: PickOptions) => {
		if (
			options &&
			dataSource &&
			options?.fields &&
			options.fields instanceof Array
		) {
			return dataSource?.map((row) => pick(row, options.fields!)) ?? []
		}
		return dataSource
	}
)
