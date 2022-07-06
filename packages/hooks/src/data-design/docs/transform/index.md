---
map:
  # 映射到docs的路径
  path: /useData/transforms/
---

# Transform 数据转换

<br />
<br />

<!-- ## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="判断类型">
</demo> -->

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





