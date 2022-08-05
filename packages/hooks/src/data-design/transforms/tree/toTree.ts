import { Transforms } from '..'

export interface ToTreeOptions {
	parentIdName?: string
	idName?: string
}

Transforms.registerTransform(
	'toTree',
	(dataSource: any[], options: ToTreeOptions) => {
		const id = options?.idName ?? 'id'
		const parentId = options?.parentIdName ?? 'parentId'
		// 删除 所有 children,以防止多次调用
		dataSource.forEach(function(item) {
			delete item.children
		})
		// 将数据存储为 以 id 为 KEY 的 map 索引数据列
		const map: any = {}
		dataSource.forEach(function(item) {
			map[item[id]] = item
		})
		const menu: any = []
		dataSource.forEach(function(item) {
			// 在map中找到当前项的父级菜单
			const parent = map[item[parentId]]
			if (parent) {
				// 如果父级菜单存在，则将当前项存入父级的children
				// 如果父级的children不存在，初始化为空数组[]后再存入
				;(parent.children || (parent.children = [])).push(item)
			} else {
				// 如果父级菜单不存在，则做为顶级菜单存入
				menu.push(item)
			}
		})

		return menu
	}
)
