---
map:
  # 映射到docs的路径
  path: /useRequest/plugins/fetchsing
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/use-request-plugins/src/useFetchingPlugin/index.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/plugins/fetchsing/demo
---

# UseRequest Fetching Plugin

A plugin for global request state management based on `pinia` implementation. The `useRequest Fetching plugin` will internally create a state management instance of pinia to collect request information.

## Feature

- Act as the intermediate state for all requests, where users can operate on the collected request results.
- Whether all requests have been completed and automatically collected to determine whether all requests have been completed.
- Non intrusive, all configurations are injected by plugins, and are non-invasive to the current function.

## Install

```bash

# It is necessary to ensure that the application contains pinia and has been used by Vue instances.

1. npm i pinia

2. npm i @vue-hooks-plus/use-request-plugins

```

## Demo

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="Multiple components, displaying complete when all requests are completed"> </demo>

## API

```typescript
import { useRequest } from 'vue-hooks-plus'
import { useFetchingPlugin } from '@vue-hooks-plus/use-request-plugins'

useRequest(
  service,
  {
    fetchingKey: (params: any[]) => string
    onFetching: (current:any,record:Record<string,any>) => void,
    isFetching: (_isFetching: boolean) => void,
  },
  [useFetchingPlugin],
)
```

## Options

| Property | Description | Type |
| --- | --- | --- |
| fetchingKey | The identification key of the status needs to be collected, and if it exists, it will be collected by the status |
| `(params: any[]) => string` |
| onFetching | Intermediate state function callback, the first parameter `current` is the current state of itself, and the second parameter `record` is all states | `(current:any,record:Record<string,any>) => void` |
| isFetching | Official built-in function to determine whether all request statuses have been completed | `(_isFetching: boolean) => void` |
