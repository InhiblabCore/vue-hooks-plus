---
map:
  # 映射到docs的路径
  path: /useRequest/global/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequestProvider.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/global/demo/demo.vue
---

# 全局配置 useRequestProvider

:::tip 🌍 useRequestProvider

基于 Provider 实现的 `useRequest` 全局配置。

:::

使用了 `useRequestProvider` 注入配置后，其子组件中使用`useRequest` 会共享这份配置。

<demo src="request-global/demo.vue"
  language="vue"
  title=""
  desc="全局配置，demo2 中注入 pollingInterval=2000后，demo2中的请求开始轮询。"> </demo>

## API

```typescript
import { useRequestProvider } from 'vue-hooks-plus'

useRequestProvider({ ...options })
```
