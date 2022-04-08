---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
---

# 依赖刷新

`useRequest` 提供了一个 `options.refreshDeps` 参数，当它的值变化后，会重新触发请求。

# 基础用法

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="每次参数依赖发生，都会携带参数重新发起请求">
</demo>
