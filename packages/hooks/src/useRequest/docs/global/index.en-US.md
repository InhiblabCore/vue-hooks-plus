---
map:
  # 映射到docs的路径
  path: /useRequest/global/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequestProvider.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/global/demo/demo.vue
---

# Global Option useRequestProvider `v1.6.1`

:::tip 🌍 useRequestProvider

Global configuration of `useRequest` based on Provider implementation.

:::

After using `useRequestProvider` to inject configuration, using `useRequest` in its subcomponents will share this configuration.

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="Global configuration, after injecting pollingInterval=2000 in demo2, the request in demo2 will start polling."> </demo>

## API

```typescript
import { useRequestProvider } from 'vue-hooks-plus'

useRequestProvider({ ...options })
```
