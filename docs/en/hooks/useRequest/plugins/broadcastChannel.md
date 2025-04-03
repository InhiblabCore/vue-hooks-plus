---
map:
  # 映射到docs的路径
  path: /useRequest/plugins/broadcastChannel
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/use-request-plugins/src/useBroadcastChannelPlugin/index.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/plugins/broadcastChannel/demo/demo.vue
---

# BroadcastChannel(Experimental)

> VERY IMPORTANT: This utility is currently in an experimental stage. This means that breaking changes will happen in minor AND patch releases. Use at your own risk. If you choose to rely on this in production in an experimental stage, please lock your version to a patch-level version to avoid unexpected breakages.

A plugin for `useRequest` based on `broadcast-channel` implementation and syncing the state of your useRequest State between browser tabs/windows with the same origin.

## Feature

- Act as the intermediate state for all requests, where users can operate on the collected request results.

## Install

```bash

# It is necessary to ensure that the application contains `broadcast-channel` .

1. npm i broadcast-channel

2. npm i @vue-hooks-plus/use-request-plugins

```

## Demo

<demo src="request-plugin-broadcastChannel/demo.vue"
  language="vue"
  title="Same origin cross window communication"
  desc="Opening the same new window, sending and refreshing data will result in data being transmitted across windows."> </demo>

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
| broadcastChannel | Required, the name of the channel, which must be the same as the channel name to receive the same frequency data. | `string` |
| broadcastChannelKey | Non mandatory identifier used to distinguish different application types. | `string` |
| broadcastChannelOptions | The configuration item for `broadcast-channel` has a default configuration of `{webWorkerSupport: false}` | `BroadcastChannelOptions` |
| customPostMessage | User defined collection and sending of data. The default sending method is `type`, `data`, `param`, `error` | `(potMessage: (msg?: any)=>Promise<void>, channel?: BroadcastChannel) => void` |
| onBroadcastChannel | Monitor and collect the same frequency data sent by other applications (including multiple windows of the same application) | `(value?: MessageType, channel?: BroadcastChannel, setFetchState?: Fetch<any, []>['setFetchState']) => void` |
