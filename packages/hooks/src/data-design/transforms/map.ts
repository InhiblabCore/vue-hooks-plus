import { Transforms } from '.'

export interface MapOptions {
	callback?(item: any, index: number, arr: any[]): any
}

function defaultCallback(row: any): any {
	return row
}

Transforms.registerTransform(
	'map',
	(dataSource: any[], options: MapOptions) => {
		return dataSource?.map(options.callback || defaultCallback) ?? []
	}
)
