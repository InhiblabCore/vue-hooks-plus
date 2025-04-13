---
map:
  # 映射到docs的路径
  path: /useDebounceFn
---

# useDebounceFn

处理防抖函数的 Hook

## 代码演示

<demo src="useDebounceFn/demo.vue"
  language="vue"
  title="基本用法"
  desc="频繁调用 run，但只会在所有点击完成 1000ms 后执行一次相关函数"> </demo>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useDebounceFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

## Params

| 参数    | 说明               | 类型                      | 默认值 |
| ------- | ------------------ | ------------------------- | ------ |
| fn      | 需要防抖执行的函数 | `(...args: any[]) => any` | -      |
| options | 配置防抖的行为     | `Options`                 | -      |

## Options

| 参数     | 说明                     | 类型      | 默认值  |
| -------- | ------------------------ | --------- | ------- |
| wait     | 超时时间，单位为毫秒     | `number`\|`Ref<number>` | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean`\|`Ref<boolean>` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean`\|`Ref<boolean>` | `true` |
| maxWait  | 最大等待时间，单位为毫秒 | `number`  |-                         |

## Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前防抖                       | `() => void`              |
| flush  | 立即调用当前防抖函数               | `() => void`              |

::: warning 注意

- `options.wait` 支持动态变化。
- `options.leading` 支持动态变化。
- `options.trailing` 支持动态变化。
- `options.maxWait` 支持动态变化。
:::
