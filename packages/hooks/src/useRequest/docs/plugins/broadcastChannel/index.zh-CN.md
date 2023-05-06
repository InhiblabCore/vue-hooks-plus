---
map:
  # 映射到docs的路径
  path: /useRequest/plugins/broadcastChannel
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/use-request-plugins/src/useBroadcastChannelPlugin/index.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/plugins/broadcastChannel/demo/demo.vue
---

# BroadcastChannel(实验)

> 非常重要：此实用程序目前处于试验阶段。这意味着重大更改将在次要和补丁版本中发生。使用风险自负。如果您选择在实验阶段的生产中依赖它，请将您的版本锁定为补丁级别版本以避免意外损坏

基于 `broadcast-channel` 实现的 `useRequest` 的插件，用于在具有`相同来源`的浏览器选项卡/窗口之间广播和同步 `useRequest` 的状态。

## 功能

- `broadcast-channel` 功能的集成。
- 相同来源的浏览器选项卡/窗口之间数据的广播和同步。
- 支持自定义信息发送和 `channel` 的使用。

## 安装

```bash

# 需要保证应用含有 `broadcast-channel`。

1. npm i broadcast-channel

2. npm i @vue-hooks-plus/use-request-plugins

```

## 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="同源跨窗口通信"
  desc="打开一个同样的新窗口，发送和刷新数据会发现数据跨窗口传递。"> </demo>

## 自定义发送体

<demo src="./demo/demo1.vue"
  language="vue"
  title="自定义同源跨窗口通信 postMessage"
  desc="自由使用 postMessage"> </demo>

## API

```typescript
import { useRequest } from 'vue-hooks-plus'
import { useBroadcastChannelPlugin } from '@vue-hooks-plus/use-request-plugins'

useRequest(
  service,
  {
    broadcastChannel?: string
    broadcastChannelKey?: string
    broadcastChannelOptions?: BroadcastChannelOptions
    customPostMessage?: (postMessage: (msg?: any) => Promise<void>, channel?: BroadcastChannel) => void
    onBroadcastChannel?: (value?: MessageType, channel?: BroadcastChannel, setFetchState?: Fetch<any, []>['setFetchState']) => void
  },
  [useBroadcastChannelPlugin],
)
```

## Options

| Property | Description | Type |
| --- | --- | --- |
| broadcastChannel | 必填，频道的名称，需要频道名称一样才能接收到同频数据。 | `string` |
| broadcastChannelKey | 非必填，用于区分不同应用类型的标识符。 | `string` |
| broadcastChannelOptions | `broadcast-channel` 的配置项，默认配置`{ webWorkerSupport:false }` | `BroadcastChannelOptions` |
| customPostMessage | 用户自定义收集发送数据，默认发送方式为 `type`,`data`,`params`,`error` | `(postMessage: (msg?: any) => Promise<void>, channel?: BroadcastChannel) => void` |
| onBroadcastChannel | 监听收集其他应用（包括同一应用的多窗口）发送的同频数据 | `(value?: MessageType, channel?: BroadcastChannel, setFetchState?: Fetch<any, []>['setFetchState']) => void` |
