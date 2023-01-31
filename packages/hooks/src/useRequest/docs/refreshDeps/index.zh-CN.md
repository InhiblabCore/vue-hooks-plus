---
map:
  # 映射到docs的路径
  path: /useRequest/refreshDeps/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useAutoRunPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/refreshDeps/demo
---

# 依赖刷新

`useRequest` 提供了一个 `options.refreshDeps` 参数，当它的值变化后，会重新触发请求。

## 手动收集依赖

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="每次参数依赖发生，都会携带参数重新发起请求"> </demo>

## 自动收集依赖 `>=v1.5.6-beta0.1`

<demo src="./demo/demo1.vue"
  language="vue"
  title=""
  desc="每次参数依赖发生，都会携带参数重新发起请求"> </demo>

## API

### Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| refreshDeps | <ul><li> 依赖响应式对象,和 `vue` 的 `watch` 传入监听的对象用法一致。</li><li>如果设置为 `true`，则会自动收集依赖执行，也支持和 `ready` 搭配使用 </li></ul> | `boolean` \| `WatchSource[]` | `-` |
