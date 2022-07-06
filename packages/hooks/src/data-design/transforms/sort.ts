import { Transforms } from '.'

// sort array
export interface Options {
	columnName?: string
	callback?(a: any, b: any): number
}

Transforms.registerTransform('sort', (dataSource: any[], options: Options) => {
	dataSource.sort(
		options.columnName
			? options.callback ||
					((a, b) => a[options.columnName!] - b[options.columnName!])
			: options.callback || ((a, b) => a - b)
	)
})
