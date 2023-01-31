---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshDeps/demo
---

# RefreshDeps

`useRequest` provides an `options.refreshDeps`, which will trigger the request refresh when its value changes.

## Manual collection of dependencies

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="In the example code above, useRequest will execution when it is initialized and Id & store ID changes."> </demo>

## Automatically collect dependencies `>=v1.6.0-alpha.1`

<demo src="./demo/demo1.vue"
  language="vue"
  title=""
  desc="In the example code above, useRequest will execution when it is initialized and Id & store ID changes."> </demo>

## API

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| refreshDeps | <ul><li> Dependent on responsive objects, and the `watch` incoming listener object usage for `vue`</li><li>If set to `true`, the dependency execution is automatically collected and is also supported with `ready` </li></ul> | `boolean` \| `WatchSource[]` | `-` |
