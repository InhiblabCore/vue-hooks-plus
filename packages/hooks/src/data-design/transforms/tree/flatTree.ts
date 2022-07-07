import { Transforms } from '..'

export interface FlatTreeOptions {
	flatKey: string
}

Transforms.registerTransform(
	'flatTree',
	(dataSource: any[], options: FlatTreeOptions) => {
		const key = options.flatKey
		const treeNodes = dataSource ?? []

		if (treeNodes.length === 0) return
		let stack: any[] = []
		const result = []
		for (let index = 0; index < treeNodes.length; index += 1) {
			stack.push(treeNodes[index])
		}

		let item
		while (stack.length) {
			item = stack.shift()
			if (item[key] && item[key].length) {
				stack = (stack ?? []).concat(item[key])
			}
			if (!item[key] && typeof item === 'object') {
				result.push(item)
			}
		}
		return result
	}
)
