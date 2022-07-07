import { SortOptions } from './transforms/sort'
import * as types from './dataType'
import { FilterOptions } from './transforms/filter'
import { MapOptions } from './transforms/map'
import { RenameOptions } from './transforms/rename'
import { PickOptions } from './transforms/pick'
import { SortByOptions } from './transforms/sort-by'
import { PartitionOptions } from './transforms/partition'
import { ToTreeOptions } from './transforms/tree/toTree'
import { FlatTreeOptions } from './transforms/tree/flatTree'

export type DataType = keyof Omit<
	typeof types,
	'objectToString' | 'toTypeString'
>

export type TransformType = {
	sort: SortOptions
	reverse: null
	filter: FilterOptions
	map: MapOptions
	rename: RenameOptions
	pick: PickOptions
	sortBy: SortByOptions
	group: PartitionOptions
	partition: PartitionOptions
	toTree: ToTreeOptions
	flatTree: FlatTreeOptions
}
