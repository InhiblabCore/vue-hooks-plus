---
map:
  # 映射到docs的路径
  path: /useRequest/basic/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequest.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/basic/demo
---

# useRequest 基础用法

介绍 `useRequest` 最核心，最基础的能力。

## 默认请求

默认情况下，`useRequest` 第一个参数是一个异步函数，在组件初始化时，会自动执行该异步函数。同时自动管理该异步函数的 `loading` , `data` , `error` 等状态。

```typescript
const { data, error, loading } = useRequest(service)
```

<br />

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="默认发送获取请求"> </demo>

## 手动触发

如果设置了 `options.manual = true`，则 `useRequest` 不会默认执行，需要通过 `run` 或者 `runAsync` 来触发执行。

```typescript
const { loading, run, runAsync } = useRequest(service, {
  manual: true,
})
```

<br />

`run` 与 `runAsync` 的区别在于：

- `run` 是一个普通的同步函数，我们会自动捕获异常，你可以通过 `options.onError` 来处理异常时的行为。
- `runAsync` 是一个返回 `Promise` 的异步函数，如果使用 `runAsync` 来调用，则意味着你需要自己捕获异常。

```typescript
runAsync()
  .then(data => {
    console.log(data)
  })
  .catch(error => {
    console.log(error)
  })
```

<br />

接下来我们通过修改用户名这个简单的场景，来演示 `useRequest` 手动触发模式，以及 `run` 与 `runAsync` 的区别。

<demo src="./demo/demo1.vue"
  language="vue"
  title="run主动发送请求"
  desc="在这个例子中，我们通过 run 来修改用户名，通过 onSuccess 和 onError 来处理成功和失败。"> </demo>

<demo src="./demo/demo2.vue"
  language="vue"
  title="runAsync主动发送请求"
  desc="在这个例子中，我们通过 runAsync 来修改用户名，此时必须通过 catch 来自行处理异常。"> </demo>

## 生命周期

`useRequest` 提供了以下几个生命周期配置项，供你在异步函数的不同阶段做一些处理。

- `onBefore`：请求之前触发
- `onSuccess`：请求成功触发
- `onError`：请求失败触发
- `onFinally`：请求完成触发

<demo src="./demo/demo3.vue"
  language="vue"
  title=""
  desc=""> </demo>

## 刷新（重复上一次请求）

`useRequest` 提供了 `refresh` 和 `refreshAsync` 方法，使我们可以使用上一次的参数，重新发起请求。

假如在读取用户信息的场景中

1. 我们读取了 ID 为 1 的用户信息 `run(1)`
2. 我们通过某种手段更新了用户信息
3. 我们想重新发起上一次的请求，那我们就可以使用 `refresh` 来代替 `run(1)`，这在复杂参数的场景中是非常有用的

<demo src="./demo/demo4.vue"
     language="vue"
     title=""
     desc=""> </demo>

当然 `refresh` 和 `refreshAsync` 的区别和 `run` 和 `runAsync` 是一致的。

## 立即变更数据

`useRequest` 提供了 `mutate`, 支持立即修改 `useRequest` 返回的 `data` 参数。

支持 `mutate(newData)` 和 `mutate((oldData) => newData)` 两种写法。

下面的示例，我们演示了一种 `mutate` 的应用场景。

我们修改了用户名，但是我们不希望等编辑接口调用成功之后，才给用户反馈。而是直接修改页面数据，同时在背后去调用修改接口，等修改接口返回之后，另外提供反馈。

<demo src="./demo/demo5.vue"
     language="vue"
     title=""
     desc=""> </demo>

## 取消响应

`useRequest` 提供了 `cancel` 函数，用于**忽略**当前 promise 返回的数据和错误

**注意：调用 `cancel` 函数并不会取消 promise 的执行**

同时 `useRequest` 会在以下时机自动忽略响应：

- 组件卸载时，正在进行的 promise
- 竞态取消，当上一次 promise 还没返回时，又发起了下一次 promise，则会忽略上一次 promise 的响应

<demo src="./demo/demo6.vue"
     language="vue"
     title=""
     desc=""> </demo>

## 参数管理

`useRequest` 返回的 `params` 会记录当次调用 `service` 的参数数组。比如你触发了 `run(1, 2, 3)`，则 `params` 等于 `[1, 2, 3]` 。

如果我们设置了 `options.manual = false`，则首次调用 `service` 的参数可以通过 `options.defaultParams` 来设置。

<demo src="./demo/demo7.vue"
     language="vue"
     title=""
     desc=""> </demo>

## 格式化请求数据

由于 `useRequest` 需要保证良好的插件系统，format 对于系统来说侵入性太大，这里格式化使用的的是 `useFormatResult`,在请求数据完成后将 data 传入 `useFormatResult` 进行格式化， `useFormatResult` 可以很好的支持 `typescript` 类型提示。 <br />

<a href="/docs/hooks/useFormatResult/" >跳转至 useFormatResult</a>

## API

```ts
const {
  loading: Ref<boolean>,
  data?: Ref<TData>,
  error?: Ref<Error>,
  params: Ref<TParams | []>,
  run: (...params: TParams) => void,
  runAsync: (...params: TParams) => Promise<TData>,
  refresh: () => void,
  refreshAsync: () => Promise<TData>,
  mutate: (data?: TData | ((oldData?: TData) => (TData | undefined))) => void,
  cancel: () => void,
} = useRequest<TData, TParams>(
  service: (...args: TParams) => Promise<TData>,
  {
    manual?: boolean,
    defaultParams?: TParams,
    formatResult?:(response:TData)=>unknown,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

## Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| data | service 返回的数据 | `Ref<TData>` \| `undefined` |
| error | service 抛出的异常 | `Ref<Error>` \| `undefined` |
| loading | service 是否正在执行 | `Ref<boolean>` |
| params | 当次执行的 service 的参数数组。比如你触发了 `run(1, 2, 3)`，则 params 等于 `[1, 2, 3]` | `Ref<TParams | []>` |
| run | <ul><li> 手动触发 service 执行，参数会传递给 service</li><li>异常自动处理，通过 `onError` 反馈</li></ul> | `(...params: TParams) => void` |
| runAsync | 与 `run` 用法一致，但返回的是 Promise，需要自行处理异常。 | `(...params: TParams) => Promise<TData>` |
| refresh | 使用上一次的 params，重新调用 `run` | `() => void` |
| refreshAsync | 使用上一次的 params，重新调用 `runAsync` | `() => Promise<TData>` |
| mutate | 直接修改 `data` | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel | 取消当前正在进行的请求 | `() => void` |

## Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| initialData | 初始化的数据 | `TData` \| `undefined` |
| manual | <ul><li> 默认 `false`。 即在初始化时自动执行 service。</li><li>如果设置为 `true`，则需要手动调用 `run` 或 `runAsync` 触发执行。 </li></ul> | `boolean` | `false` |
| defaultParams | 首次默认执行时，传递给 service 的参数 | `TParams` | - |
| formatResult | 格式化请求结果，建议使用 `useFormatResult` | `(response: TData) => any` | - |
| onBefore | service 执行前触发 | `(params: TParams) => void` | - |
| onSuccess | service resolve 时触发 | `(data: TData, params: TParams) => void` | - |
| onError | service reject 时触发 | `(e: Error, params: TParams) => void` | - |
| onFinally | service 执行完成时触发 | `(params: TParams, data?: TData, e?: Error) => void` | - |

:::info 🛸 PRO

这是 useRequest 最基础的功能，接下来介绍一些更高级的能力。

:::
