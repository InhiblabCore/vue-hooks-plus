---
map:
  # 映射到docs的路径
  path: /useRequest/plugin/
---

# 自定义插件

通过设置第三个参数`plugins`，为`useRequest` 添加自定义插件，`useRequest` 会触发插件执行。

## 代码演示

### 自定义字段过滤插件

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="字段过滤插件, 在数据请求成功的时候修改名字和年龄">
</demo>

## API

``` typescript
const useFormatter: Plugin<
	{
		name: string
		age: number
	},
	[]
> = (fetchInstance, { formatter }) => {
	return {
		onSuccess: () => {
			fetchInstance.setData(formatter(fetchInstance.state.data), 'data')
		},
	}
}
```


### Options

| 参数  | 说明                 | 类型      | 默认值 |
| ----- | -------------------- | --------- | ------ |
| Plugin | 自定义插件 | ` (fetchInstance, option)=>Result` | - |


### 注意
符合useRequest约定式的规则
