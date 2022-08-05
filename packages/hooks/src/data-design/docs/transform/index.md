---
map:
  # 映射到docs的路径
  path: /useDataDesign/transforms/
---

# Transform 数据转换

<br />
<br />



<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="判断类型">
</demo>

## 数组处理

### 基本用法

```typescript
import { useData } from 'vue3-hooks-plus'

const { transform } = useData()
```

### sort 排序
```typescript
const data = [1, 2, 3, 4, 5],

transform({
	type: 'sort',
	data,
	callback: (a, b) => b - a,
})
// [5,4,3,2,1]
```



### pick 字段过滤
```typescript
const data =  [
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 1234,
		},
	]

transform({
	type: 'pick',
	data,
	fields: ['name'],
})
// [{"name":"123"},{"name":"123"},{"name":"123"}]
```


### filter 数据过滤
```typescript
const data = [1, 2, 3, 4, 5],

transform({
	type: 'filter',
	data,
    callback: (item) => item > 3
})
// [4,5]
```

### map 数据加工
```typescript
const data = [1, 2, 3, 4, 5],

transform({
	type: 'map',
	data,
    callback: (item) => (item > 3 ? true : false
})
// [false,false,false,true,true]
```

### reverse 逆序数组
```typescript
const data = [1, 2, 3, 4, 5],

transform({
	type: 'reverse',
	data,
})
// [5,4,3,2,1]
```

### rename 字段重命名
```typescript
const data =  [
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 1234,
		},
	]

transform({
	type: 'rename',
	data,
	map: {
		name: 'x',
		age: 'y',
	},
})
// [{"x":"123","y":123},{"x":"123","y":123},{"x":"123","y":1234}]
```

### sortBy 按字段排序
lodash方法，使用一致
```typescript
const data =  [
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 1234,
		},
	]

transform({
	type: 'sortBy',
	data,
	fields: ['age'],
	order: 'DESC',
})
// [{"name":"123","age":1234},{"name":"123","age":123},{"name":"123","age":123}]
```

### partition 数据分组
```typescript
const data =  [
		{
			name: '1',
			age: 123,
		},
		{
			name: '2',
			age: 123,
		},
		{
			name: '3',
			age: 1234,
		},
	]

transform({
	type: 'partition',
	data,
	groupBy: ['name'],
	orderBy: ['age'],
})
// {"_1":[{"name":"1","age":123}],"_2":[{"name":"2","age":123}],"_3":[{"name":"3","age":1234}]}

```

## 树处理

### 生成树结构

```typescript
const data = [
		{
			name: '1',
			parentId: null,
			id: 100,
			age: 123,
		},
		{
			parentId: 100,
			name: '2',
			age: 123,
			id: 200,
		},
		{
			name: '3',
			age: 1234,
			parentId: 200,
			id: 300,
		},
	]
transform({
	type: 'toTree',
	data,
})
//[{"name":"1","parentId":null,"id":100,"age":123,"children":[{"parentId":100,"name":"2","age":123,"id":200,"children":[{"name":"3","age":1234,"parentId":200,"id":300}]}]}]

```

### 扁平化树形结构

扁平化树形取所有子集

```typescript
const data = [
		{
			name: '1',
			parentId: null,
			id: 100,
			age: 123,
			children: [
				{
					parentId: 100,
					name: '2',
					age: 123,
					id: 200,
					children: [{ name: '3', age: 1234, parentId: 200, id: 300 }],
				},
				{
					parentId: 100,
					name: '2',
					age: 123,
					id: 201,
					children: [{ name: '23', age: 12345, parentId: 201, id: 302 }],
				},
			],
		},
	]
transform({
	type: 'flatTree',
	data,
    flatKey: 'children',
})
// [{"name":"3","age":1234,"parentId":200,"id":300},{"name":"23","age":12345,"parentId":201,"id":302}]
```




