---
map:
  # 映射到docs的路径
  path: /useRequest/plugin/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/Fetch.ts#L59
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/pluginDoc/demo/demo.vue
---

# 插件设计规范

## 开发插件

> 如果 `useRequest` 内置插件不能满足你的定制化需求， `useRequest` 允许开发约定式插件使其具备定制化能力。
>
> 通过设置第三个参数`plugins`，为`useRequest` 添加插件，`useRequest` 会触发插件执行。
>
> 插件作为一个符合 `useRequest` 插件运行的函数，需要符合运行规范进行开发。

## 命名规范

倡导以 `use` 作为开头,以 `Plugin` 结尾命名的插件，`useXxxxPlugin`

## 约定式 Typescript 类型定义

```typescript
const useXxxxPlugin: Plugin<TData, TParams, PluginOption> = Fn(fetchInstance, options)
```

`useRequest` 会导出一个插件类型作为修饰，泛型对应 `useRequest` 的 `data` 、 `params` 、`PluginOption`

## 约定式 插件参数

对应 👆 的 `Fn` 函数，函数第一个参数为 `fetchInstance` 实例，你可以使用这个实例上携带的所有方法。

```typescript
cancel: Fetch < TData, TParams > ['cancel']
refresh: Fetch < TData, TParams > ['refresh']
refreshAsync: Fetch < TData, TParams > ['refreshAsync']
run: Fetch < TData, TParams > ['run']
runAsync: Fetch < TData, TParams > ['runAsync']
mutate: Fetch < TData, TParams > ['mutate']
```

对应 👆 的 `Fn` 函数，函数第二个参数为 `options` 配置，你可以使用`useRequest`携带的所有配置项，包括你插件定义的配置项。

```typescript

  type Options
  &
  type PlginOptions

```

## 约定式 插件结果返回

插件作为一个函数，这里需要约定式的在插件周期中返回插件运行结果，如在 `onSuccess` 执行某段逻辑，在 `onError` 执行某段错误处理的逻辑。

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

:::tip 注意

需要设置 `data` 、`params` 、 `loading` 、 `error` 需要使用实例上的 `setData` 进行变更。

:::

## 开发一个简单的过滤插件

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="字段过滤插件, 在数据请求成功的时候修改原本的数据"> </demo>

在请求数据完成后将 外部传入的 `formatter` 处理完数据后将结果返回，调用 `setData` 重新设置值。

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

| 参数   | 说明       | 类型                                      | 默认值 |
| ------ | ---------- | ----------------------------------------- | ------ |
| Plugin | 自定义插件 | `(fetchInstance, option) => PluginReturn` | -      |
