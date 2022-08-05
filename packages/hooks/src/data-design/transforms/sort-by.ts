import { Transforms } from '.'
import { sortBy, isArray } from 'lodash'

const VALID_ORDERS = ['ASC', 'DESC']

export interface SortByOptions {
	fields?: string[]
	order?: 'ASC' | 'DESC'
}

Transforms.registerTransform(
	'sortBy',
	(dataSource: any[], options: SortByOptions) => {
		if (!isArray(options?.fields)) {
			throw new TypeError('Invalid fields: must be an array with strings!')
		}
		if (
			options &&
			dataSource &&
			options?.fields &&
			options.fields instanceof Array
		) {
			const rows = sortBy(dataSource, options.fields)
			const order = options.order
			if (order && VALID_ORDERS.indexOf(order) === -1) {
				throw new TypeError(
					`Invalid order: ${order} must be one of ${VALID_ORDERS.join(', ')}`
				)
			} else if (order === 'DESC') {
				rows.reverse()
			}
			return rows ?? []
		}
		return dataSource
	}
)
