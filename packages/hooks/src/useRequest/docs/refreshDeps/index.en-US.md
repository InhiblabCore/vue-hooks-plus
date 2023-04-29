---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshDeps/demo
---

# RefreshDeps

`useRequest` provides an `options.refreshDeps`,Instead of `watch`, it will listen for changes in responsive values and reissue requests when the values change .

:::tip remark

When the automatic, mode `manual` is not `true` and refreshDeps will take effect.

:::

## Manual collection of dependencies

When `refreshDeps` passes in an array of responsive objects, when its value changes, the request will be retriggered.

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="In the example code above, useRequest will execution when it is initialized and Id & store ID changes."> </demo>

## Automatically collect dependencies `v1.6.0`

When `refreshDeps` is passed in `true`, `useRequest` will automatically collect the response object parameters in the function parameters, as long as the response object in the parameters changes, it will carry the latest value to re-initiate the request.

<demo src="./demo/demo1.vue"
  language="vue"
  title=""
  desc="In the example code above, useRequest will execution when it is initialized and Id & store ID changes."> </demo>

## API

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| refreshDeps | <ul><li> Dependent on responsive objects, and the `watch` incoming listener object usage for `vue`</li><li>If set to `true`, the dependency execution is automatically collected and is also supported with `ready` </li></ul> | `boolean` \| `WatchSource[]` | `-` |
