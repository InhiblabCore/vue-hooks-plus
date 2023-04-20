---
map:
  # 映射到docs的路径
  path: /useRequest/plugins/fetchsing
source:
  show: false
---

# useRequest Fetching 插件

基于 `pinia` 实现的全局请求状态管理的插件。useRequest Fetching 插件会在内部创建一个 `pinia`的状态管理实例，收集请求的信息。

## 功能

- 充当所有请求的状态中间态，用户可以在中间态中对收集的请求结果进行操作。
- 是否所有请求都完成，自动收集判断所有请求是否完成。
- 无侵入性，所有配置均由插件注入，对当前函数无侵入性。

## 安装

```bash

# 需要保证应用含有pinia，并且被Vue实例 use。

1. npm i pinia

2. npm i @vue-hooks-plus/use-request-plugins

```

## 示例

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="多个组件，当所有请求完成后显示 complete"> </demo>

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

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| fetchingKey | 需要收集状态的标识 key，存在即会被状态收集 | `(params: any[]) => string` | - |
| onFetching | 中间态函数回调，第一个参数`current`是当前自身的状态，第二个参数`record`是所有的状态 | `(current:any,record:Record<string,any>) => void` | - |
| isFetching | 官方自带的功能，判断所有请求状态是否请求完成 | `(_isFetching: boolean) => void` | - |
