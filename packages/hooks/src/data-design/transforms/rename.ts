import { Transforms } from '.'
import { isPlainObject, forIn, isString } from 'lodash'

export interface RenameOptions {
	map?: Record<string, string>
}

Transforms.registerTransform(
	'rename',
	(dataSource: any[], options: RenameOptions) => {
		const map = options.map || {}
		const cleanMap: Record<string, string> = {}
		if (isPlainObject(map)) {
			forIn(map, (value, key) => {
				if (isString(value) && isString(key)) {
					cleanMap[key] = value
				}
			})
		}

		dataSource?.forEach((row) => {
			forIn(cleanMap, (newKey, key) => {
				const temp = row[key]
				delete row[key]
				row[newKey] = temp
			})
		})
		return dataSource instanceof Array ? dataSource : []
	}
)
