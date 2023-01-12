---
map:
  # 映射到docs的路径
  path: /useRequest/cache/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useCachePlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/cache/demo
---

# Cache & SWR

If `options.cacheKey` is set, useRequest will cache the successful data . The next time the component is initialized, if there is cached data, we will return the cached data first, and then send a new request in background, which is the ability of SWR.

You can set the data retention time through `options.staleTime`. During this time, we consider the data to be fresh and will not re-initiate the request.

You can also set the data cache time through `options.cacheTime`, after this time, we will clear the cached data.

Next, through a few examples to experience these features.

## SWR

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="In the following example, we set the cacheKey. When the component is loaded for the second time, the cached content will be returned first, and then the request will be re-run in background. You can experience the effect by clicking the button."> </demo>

## Keep your data fresh

<demo src="./demo/demo1.vue" language="vue" title="" desc="By setting staleTime, we can specify the data retention time, during which time the request will not be re-run. The following example sets a fresh time of 5s, you can experience the effect by clicking the button
"> </demo>

## Data sharing

The content of the same `cacheKey` is shared globally, which will bring the following features

- Sharing request `Promise`, only one of the same `cacheKey` will initiate a request at the same time, and the subsequent ones will share the same request `Promise`.
- Data synchronization. At any time, when we change the content of one of the `cacheKey`, the content of the other `cacheKey` will be synchronized. In the following example, the two components will only initiate one request during

<demo src="./demo/demo2.vue"
  language="vue"
  title=""
  desc="initialization. And the content of the two articles is always synchronized."> </demo>

## Parameters cache

The cached data includes `data` and `params`. Through the `params` caching mechanism, we can remember the conditions of the last request and initialize it next time.

<demo src="./demo/demo3.vue"
  language="vue"
  title=""
  desc="In the following example, we can initialize the keyword from the cached params"> </demo>

## Clear cache

provides a `clearCache` method, which can clear the cache data of the specified `cacheKey`.

## Custom cache

By setting `setCache` and `getCache`, you can customize the cache, for example, you can store data in `localStorage, IndexDB`, etc.

::: tip Please note

1. `setCache` and `getCache` need to be used together.
2. In the custom cache mode, `cacheTime` and `clearCache` will be unused, please implement it yourself according to the actual situation.

:::

<demo src="./demo/demo4.vue"
  language="vue"
  title=""
  desc=""> </demo>

## API

```ts
interface CachedData<TData, TParams> {
  data: TData
  params: TParams
  time: number
}
```

### Options

| Property | Description | Type | Default Value |
| --- | --- | --- | --- |
| cacheKey | A unique ID of the request. If `cacheKey` is set, we will enable the caching mechanism. The data of the same `cacheKey` is globally synchronized. | `string` | - |
| cacheTime | <ul><li> Set the cache time. By default, the cached data will be cleared after 5 minutes. </li><li> If set to `-1`, the cached data will never expire</li></ul> | `number` | `300000` |
| staleTime | <ul><li> Time to consider the cached data is fresh. Within this time interval, the request will not be re-initiated</li><li> If set to `-1`, it means that the data is always fresh</li></ul> | `number` | `0` |
| setCache | <ul><li> Custom set cache </li><li> `setCache` and `getCache` need to be used together</li><li> In the custom cache mode, `cacheTime` and `clearCache` are useless, please implement it yourself according to the actual situation.</li></ul> | `(data: CachedData) => void;` | - |
| getCache | Custom get cache | `(params: TParams) => CachedData` | - |

### clearCache

```typescript
import { clearCache } from 'vue-hooks-plus/es/useRequest';
clearCache(cacheKey?: string | string[]);
```

1. Support clearing a single cache, or a group of caches
2. If `cacheKey` is empty, all cached data will be cleared

::: warning Remark

- Only successful request data will be cached
- Cached data includes `data` and `params`

:::
