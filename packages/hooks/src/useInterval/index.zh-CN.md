---
map:
  # 映射到docs的路径
  path: /useInterval
---

# useInterval

处理 setInterval 的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="每2000ms，执行一次"> </demo>

## API

```typescript
useInterval(
  fn: () => void,
  delay?: number | undefined,
  options?: Options
): fn: () => void;
```

## Params

| 参数    | 说明                                        | 类型                                   |
| ------- | ------------------------------------------- | -------------------------------------- |
| fn      | 要定时调用的函数                            | `() => void`                           |
| delay   | 间隔时间，当取值 `undefined` 时会停止计时器 | `Ref<number>`\|`number` \| `undefined` |
| options | 配置计时器的行为                            | `Options`                              |

## Options

| 参数      | 说明                     | 类型      | 默认值  |
| --------- | ------------------------ | --------- | ------- |
| immediate | 是否在首次渲染时立即执行 | `boolean` | `false` |

## Result

| 参数    | 说明           | 类型         |
| ------- | -------------- | ------------ |
| clear   | 清除定时器     | `() => void` |
| restart | 重新启动定时器 | `() => void` |
