---
map:
  # 映射到docs的路径
  path: /useRequest/ready/
---

# Ready

`useRequest` 提供了一个 `options.ready` 参数，当其值为 `false` 时，请求永远都不会发出。

- 1、当 `manual=false` 自动请求模式时，每次 `ready` 从 `false` 变为 `true` 时，都会自动发起请求，会带上参数 `options.defaultParams`。
- 2、当 `manual=true` 手动请求模式时，只要 `ready=false`，则通过 `run/runAsync` 触发的请求都不会执行。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="每次 ready 从 false 变为 true 时，都会重新发起请求"> </demo>

## Options

| 参数  | 说明                 | 类型                      | 默认值 |
| ----- | -------------------- | ------------------------- | ------ |
| ready | 当前请求是否准备好了 | `boolean`\|`Ref<boolean>` | `true` |
