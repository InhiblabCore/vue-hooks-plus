---
map:
  # 映射到docs的路径
  path: /useRequest/ready/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/ready/demo/demo.vue
---

# Ready

`useRequest` provides an `options.ready`, when its value is false, the request will never be sent.

- 1、In the automatic mode of `manual=false`, every time `ready` changes from `false` to `true`, a request will be automatically executed with the parameter `options.defaultParams`.
- 2、When `manual=true` manual request mode, as long as `ready=false`, the request triggered by run/runAsync will not be executed.

## Code demonstration

<demo src="request-ready/demo.vue"
  language="vue"
  title=""
  desc="Every time ready changes from false to true, the request will be executed."> </demo>

## Options

| Property | Description                  | Type                      | Default |
| -------- | ---------------------------- | ------------------------- | ------- |
| ready    | Is the current request ready | `boolean`\|`Ref<boolean>` | `true`  |
