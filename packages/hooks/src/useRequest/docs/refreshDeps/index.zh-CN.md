---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshDeps/demo/demo.vue
---

# 依赖刷新

`useRequest` 提供了一个 `options.refreshDeps` 参数，当它的值变化后，会重新触发请求。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="每次参数依赖发生，都会携带参数重新发起请求"> </demo>

## API

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| refreshDeps | 依赖响应式对象,和 `vue` 的 `watch` 传入监听的对象用法一致 | `any` \| `WatchSource[]` | `-` |
