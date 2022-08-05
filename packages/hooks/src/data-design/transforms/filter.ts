import { Transforms } from '.'

function defaultCallback(row: any): boolean {
	return !!row
}

export interface FilterOptions {
	callback?: (item: any) => boolean
}

Transforms.registerTransform(
	'filter',
	(dataSource: any[], options: FilterOptions) => {
		return dataSource?.filter(options.callback || defaultCallback) ?? []
	}
)
