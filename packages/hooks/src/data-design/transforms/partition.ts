import { values, assign } from 'lodash'
import { Transforms } from '.'
import partition from './utils/partition'

export interface PartitionOptions {
	groupBy: string[]
	orderBy?: string[]
}

const DEFAULT_OPTIONS: PartitionOptions = {
	groupBy: [], // optional
	orderBy: [],
}

Transforms.registerTransform(
	'partition',
	(dataSource: any[], options: PartitionOptions) => {
		options = assign({} as PartitionOptions, DEFAULT_OPTIONS, options)
		const rows = partition(dataSource, options.groupBy, options.orderBy)
		return rows
	}
)

function group(dataSource: any[], options: PartitionOptions): void {
	options = assign({} as PartitionOptions, DEFAULT_OPTIONS, options)
	// @ts-ignore
	return values(partition(dataSource, options.groupBy, options.orderBy))
}

Transforms.registerTransform('group', group)
