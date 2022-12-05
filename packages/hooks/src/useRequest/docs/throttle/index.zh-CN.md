---
map:
  # 映射到docs的路径
  path: /useRequest/throttle/
---

# 节流

`useRequest` 提供了一个 `options.throttleWait` 参数，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

# 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="你可以在 input 框中快速输入文本，体验效果"> </demo>

## API

### Options

throttle 所有参数用法和效果同 [lodash.throttle](https://www.lodashjs.com/docs/lodash.throttle/)

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| throttleWait | 节流等待时间, 单位为毫秒，设置后，进入节流模式 | `number` | - |
| throttleLeading | 在节流开始前执行调用 | `boolean`\|`Ref<boolean>` | `true` |
| throttleTrailing | 在节流结束后执行调用 | `boolean`\|`Ref<boolean>` | `true` |

## 注意

- `options.throttleWait`、`options.throttleLeading`、`options.throttleTrailing` 支持动态变化。
- `runAsync` 在真正执行时，会返回 `Promise`。在未被执行时，不会有任何返回。
