import './transforms/sort'
import './transforms/reverse'
import './transforms/filter'
import './transforms/map'
import './transforms/rename'
import './transforms/pick'
import './transforms/sort-by'
import './transforms/partition'
import './transforms/tree/toTree'
import './transforms/tree/flatTree'

import { Transforms } from './transforms'

import { DataType, TransformType } from './type'
import * as typesCheck from './dataType'

export default function useData() {
	const dataType = <D = any>({
		type,
		target,
	}: {
		type: DataType
		target: D
	}) => {
		if (typesCheck?.[type]) {
			return typesCheck?.[type](target)
		} else {
			console.error('Type does not exist')
		}
	}

	const transform = <
		K extends keyof TransformType = keyof TransformType,
		T = any
	>({
		type,
		data,
		...option
	}: {
		type: K
		data: T
		option?: TransformType[K]
	} & {
		[P in keyof TransformType[K]]: TransformType[K][P]
	}) => {
		const transform = Transforms.getTransform(type)
		return transform(data as T, option)
	}

	return {
		dataType,
		transform,
	}
}
