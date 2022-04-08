---
map:
  # 映射到docs的路径
  path: /useRequest/retry/
---

# 错误重试

`useRequest` 提供了一个 `options.retryCount` 参数，指定错误重试次数，则 `useRequest` 在失败后会进行重试

# 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="请求错误重试三次,加上首次请求失败，所以最后为四次错误">
</demo>
