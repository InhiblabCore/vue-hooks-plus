---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshDeps/demo/demo.vue
---

# RefreshDeps

`useRequest` provides an `options.refreshDeps`, which will trigger the request refresh when its value changes.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="In the example code above, useRequest will execution when it is initialized and Id & store ID changes."> </demo>

## API

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| refreshDeps | Dependent on responsive objects, and the `watch` incoming listener object usage for `vue` | `any` \| `WatchSource[]` | `-` |
