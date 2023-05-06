---
map:
  # 映射到docs的路径
  path: /useMedia
---

# useMedia

优雅使用媒体查询的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="用于媒体查询-最小尺寸320px"> </demo>

## API

```javascript
const value = useMedia(['(min-width: 320px)'], [true], false)
```

## Options

| 参数         | 说明                       | 类型        | 默认值 |
| ------------ | -------------------------- | ----------- | ------ |
| queries      | 媒体查询对象数组           | `string[]`  | -      |
| values       | 每一项媒体查询对象的默认值 | `boolean[]` | -      |
| defaultValue | 默认值                     | `boolean`   |

## Result

| 参数  | 说明         | 类型                     |
| ----- | ------------ | ------------------------ |
| value | 是否符合查询 | `Readonly<Ref<boolean>>` |
