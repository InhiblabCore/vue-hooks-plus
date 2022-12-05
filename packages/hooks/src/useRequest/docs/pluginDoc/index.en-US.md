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
const useXxxxPlugin: Plugin<TData, TParams, PluginOption> = Fn(fetchInstance, options)
```

`useRequest` will export a plugin type as a modification, the generic corresponds to `useRequest`'s `data`, `params`, `PluginOption`

## Convened plug-in parameters

Corresponding to the 👆 's `Fn` function, the function's first parameter is the `fetchInstance` instance, and you can use all the methods carried on this instance.

```typescript
cancel: Fetch < TData, TParams > ['cancel']
refresh: Fetch < TData, TParams > ['refresh']
refreshAsync: Fetch < TData, TParams > ['refreshAsync']
run: Fetch < TData, TParams > ['run']
runAsync: Fetch < TData, TParams > ['runAsync']
mutate: Fetch < TData, TParams > ['mutate']
```

Corresponding to the 👆 `Fn` function, the function the second parameter is the `options` configuration, and you can use all the configuration items carried by the `useRequest`, including those defined by your plugin.

```typescript

  type Options
  &
  type PlginOptions

```

## Conventional plug ugin results returned

As a function of this, it is required to return the plugin running results in the plugin cycle, such as executing a segment of logic in `onSuccess` and a segment of error processing in `onError`.

```typescript
interface PluginReturn<TData, TParams extends any[]> {
  onBefore?: (
    params: TParams,
  ) =>
    | ({
        stopNow?: boolean
        returnNow?: boolean
      } & Partial<FetchState<TData, TParams>>)
    | void

  onRequest?: (
    service: Service<TData, TParams>,
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

### ⚠️ Remark

Need to setup `data`, `params`, `loading`, `error` Change requires use using the `setData` on the instance.

## Develop a simple filtering plugin

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="Field filter plug-in to modify the original data when the data request is successful"> </demo>

Return the results after the request data has processed the data, call `setData` to reset the value.

```typescript
const useFormatterPlugin: Plugin<
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
      fetchInstance.setData(formatter?.(fetchInstance.state.data), 'data')
    },
  }
}
```

## API

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

## Options

| Property | Description   | Type                                      | Default |
| -------- | ------------- | ----------------------------------------- | ------- |
| Plugin   | Custom plugin | `(fetchInstance, option) => PluginReturn` | -       |
