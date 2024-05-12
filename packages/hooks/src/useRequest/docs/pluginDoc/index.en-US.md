---
map:
  # 映射到docs的路径
  path: /useRequest/plugin/
---

# Plug-in design specification

## Develop plugin

> If the `useRequest` built-in plugin does not meet your customization needs, `useRequest` allows the development of convention plugins to make them customized.
>
> By setting the third parameter `plugins` and adding the plugin to `useRequest`, `useRequest` triggers the plugin execution.
>
> As a function in line with a `useRequest` plugin, it needs to develop according to operational specifications.

## Naming specification

Advocate for a plugin initiated with `use`, named after `Plugin` ending, `useXxxxPlugin`

## Convened Typescript type definition

```typescript
const useXxxxPlugin: UseRequestPlugin<TData, TParams, UseRequestPluginOption> = Fn(
  fetchInstance,
  options,
)
```

`useRequest` will export a plugin type as a modification, the generic corresponds to `useRequest`'s `data`, `params`, `PluginOption`

## Convened plug-in parameters

Corresponding to the 👆 's `Fn` function, the function's first parameter is the `fetchInstance` instance, and you can use all the methods carried on this instance.

```typescript
cancel: UseRequestFetch < TData, TParams > ['cancel']
refresh: UseRequestFetch < TData, TParams > ['refresh']
refreshAsync: UseRequestFetch < TData, TParams > ['refreshAsync']
run: UseRequestFetch < TData, TParams > ['run']
runAsync: UseRequestFetch < TData, TParams > ['runAsync']
mutate: UseRequestFetch < TData, TParams > ['mutate']
```

Corresponding to the 👆 `Fn` function, the function the second parameter is the `options` configuration, and you can use all the configuration items carried by the `useRequest`, including those defined by your plugin.

```typescript

  type UseRequestOptions
  &
  type UseRequestPlginOptions

```

## Conventional plug ugin results returned

As a function of this, it is required to return the plugin running results in the plugin cycle, such as executing a segment of logic in `onSuccess` and a segment of error processing in `onError`.

```typescript
interface UseRequestPluginReturn<TData, TParams extends any[]> {
  onBefore?: (
    params: TParams,
  ) =>
    | ({
        stopNow?: boolean
        returnNow?: boolean
      } & Partial<UseRequestFetchState<TData, TParams>>)
    | void

  onRequest?: (
    service: UseRequestService<TData, TParams>,
    params: TParams,
  ) => {
    servicePromise?: Promise<TData>
  }

  onSuccess?: (data: TData, params: TParams) => void
  onError?: (e: Error, params: TParams) => void
  onFinally?: (params: TParams, data?: TData, e?: Error) => void
  onCancel?: () => void
  onMutate?: (data: TData) => void
}
```

:::tip Remark

Need to setup `data`, `params`, `loading`, `error` Change requires use using the `setFetchState` on the instance.

:::

## Develop a simple filtering plugin

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="Field filter plug-in to modify the original data when the data request is successful"> </demo>

Return the results after the request data has processed the data, call `setFetchState` to reset the value.

### V1 example

```typescript
const useFormatterPlugin: UseRequestPlugin<
  {
    name: string
    age: number
  },
  [],
  {
    formatter?: ({ name, age }?: { name: string; age: number }) => any
  }
> = (fetchInstance, { formatter }) => {
  return {
    onSuccess: () => {
      fetchInstance.setFetchState(formatter?.(fetchInstance.state.data), 'data')
    },
  }
}
```

### V2 example

```typescript
const useFormatterPlugin: UseRequestPlugin<
  {
    name: string
    age: number
  },
  [],
  {
    formatter?: ({ name, age }?: { name: string; age: number }) => any
  }
> = (fetchInstance, { pluginOptions }) => {
  return {
    onSuccess: () => {
      fetchInstance.setFetchState(pluginOptions?.formatter?.(fetchInstance.state.data), 'data')
    },
  }
}
```

## V1 API

```typescript
const { data } = useRequest(
  () => serviceFn(),
  {
    ...option,
    ...pluginOption,
  },
  [useFormatterPlugin, ...otherPlugins],
)
```

## V2 API

```typescript
const { data } = useRequest(
  () => serviceFn(),
  {
    ...option,
    pluginOptions: {
      ...pluginOption,
    },
  },
  [useFormatterPlugin, ...otherPlugins],
)
```

## Options

| Property | Description   | Type                                                | Default |
| -------- | ------------- | --------------------------------------------------- | ------- |
| Plugin   | Custom plugin | `(fetchInstance, option) => UseRequestPluginReturn` | -       |
