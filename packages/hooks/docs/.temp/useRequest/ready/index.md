---
map:
  path: /useRequest/ready/
  realPath: src/useRequest/doc/ready/index.md
---

# Ready

`useRequest` 提供了一个 `options.ready` 参数，当其值为 `false` 时，请求永远都不会发出。

# 自动模式

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="每次 ready 从 false 变为 true 时，都会重新发起请求">
</demo>
