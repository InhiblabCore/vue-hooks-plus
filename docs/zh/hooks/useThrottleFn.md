---
map:
  # 映射到docs的路径
  path: /useThrottleFn
---

# useThrottleFn

处理节流函数的 Hook

## 代码演示

<demo src="useThrottleFn/demo.vue"
  language="vue"
  title="基本用法"
  desc="频繁调用 run，但只会每隔 1000ms 执行一次相关函数。"> </demo>

## API

```typescript
const {
  run,
  cancel,
  flush
} = useThrottleFn(
  fn: (...args: any[]) => any,
  options?: Options
);
```

## Params

| 参数    | 说明           | 类型                      | 默认值 |
| ------- | -------------- | ------------------------- | ------ |
| fn      | 需要节流的函数 | `(...args: any[]) => any` | -      |
| options | 配置节流的行为 | `Options`                 | -      |

## Options

| 参数     | 说明                     | 类型      | 默认值 |
| -------- | ------------------------ | --------- | ------ |
| wait     | 超时时间，单位为毫秒     | `number`\|`Ref<number>` | `1000` |
| leading  | 是否在延迟开始前调用函数 | `boolean`\|`Ref<boolean>` | `false` |
| trailing | 是否在延迟开始后调用函数 | `boolean`\|`Ref<boolean>` | `true` |

## Result

| 参数   | 说明                               | 类型                      |
| ------ | ---------------------------------- | ------------------------- |
| run    | 触发执行 fn，函数参数将会传递给 fn | `(...args: any[]) => any` |
| cancel | 取消当前节流                       | `() => void`              |
| flush  | 当前节流立即调用                   | `() => void`              |

::: warning 注意

- `options.wait` 支持动态变化。
- `options.leading` 支持动态变化。
- `options.trailing` 支持动态变化。
:::
