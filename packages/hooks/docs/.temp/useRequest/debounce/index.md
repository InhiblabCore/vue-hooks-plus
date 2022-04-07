---
map:
  path: /useRequest/debounce/
  realPath: src/useRequest/doc/throttle/index.md
---

# 防抖

`useRequest` 提供了一个 `options.throttleWait` 参数，进入节流模式，此时如果频繁触发 `run` 或者 `runAsync`，则会以节流策略进行请求。

# 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="input 框中快速输入文本,频繁触发 run，只会在最后一次触发结束后等待 500ms 执行">
</demo>
