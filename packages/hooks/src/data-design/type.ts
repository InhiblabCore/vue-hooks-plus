import { SortOptions } from './transforms/sort'
import * as types from './dataType'
import { FilterOptions } from './transforms/filter'
import { MapOptions } from './transforms/map'
import { RenameOptions } from './transforms/rename'
import { PickOptions } from './transforms/pick'
import { SortByOptions } from './transforms/sort-by'

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
}
