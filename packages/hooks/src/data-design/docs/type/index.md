---
map:
  # 映射到docs的路径
  path: /useDataDesign/typesCheck/
---

# 类型处理

对类型进行处理，判断数据源是否属于指定类型
<br />
<br />

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="判断类型">
</demo>

### Params

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| type | isArray 、isMap 、 isFunction ...| string | - |
| target | 传入的目标值| any | - |

### Result

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| result   | 布尔值   | boolean |



