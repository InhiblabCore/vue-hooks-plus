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
  desc="input 框中快速输入文本,频繁触发 run，每次间隔 200ms 执行">
</demo>
