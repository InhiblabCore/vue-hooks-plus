import { Transforms } from './index'

// sort array
export interface SortOptions {
	columnName?: string
	callback?(a: any, b: any): number
}
Transforms.registerTransform(
	'sort',
	(dataSource: any[], options: SortOptions) => {
		if (options?.callback && dataSource != undefined && dataSource !== null) {
			return dataSource.sort(options?.callback)
		}
		return dataSource.sort(
			options?.columnName
				? (a, b) => a[options.columnName!] - b[options.columnName!]
				: (a, b) => a - b
		)
	}
)
