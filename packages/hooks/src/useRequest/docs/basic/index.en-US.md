---
map:
  # Path mapped to docs
  path: /useRequest/basic/
---

# useRequest Basic usage

we will introduce the core and basic functionalities of `useRequest`, that is, the functionalities of the `useRequest` kernel.

## Code demonstration

### Default request

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="The fetch request is sent by default"> </demo>

### Format the request data

Since `useRequest` needs to guarantee a good plug-in system, format is too invasive for the system, the formatting here is `useFormatResult`, format data to `useFormatResult` after the request data is completed, `useFormatResult` can well support `typescript` type prompt. <br />

<a href="/docs/hooks/en/useFormatResult/" >Jump to useFormatResult</a>

## API

```ts
const {
  loading: Ref<boolean>,
  data?: Ref<TData>,
  error?: Ref<Error>,
  params: Ref<TParams || []>,
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
    formatResult?:(response:TData)=>any,
    onBefore?: (params: TParams) => void,
    onSuccess?: (data: TData, params: TParams) => void,
    onError?: (e: Error, params: TParams) => void,
    onFinally?: (params: TParams, data?: TData, e?: Error) => void,
  }
);
```

### Result

| Property | Description | Type |
| --- | --- | --- |
| data | Data returned by service | `Ref<TData>` \| `undefined` |
| error | Exception thrown by service | `Ref<Error>` \| `undefined` |
| loading | Is the service being executed | `Ref<boolean>` |
| params | An array of parameters for the service being executed. For example, you triggered `run(1, 2, 3)`, then params is equal to `[1, 2, 3]` | `Ref<TParams>` \| `[]` |
| formatResult | Format the request results, which recommend to use `useFormatResult` | `(response: TData) => any` |  |
| run | <ul><li> Manually trigger the execution of the service, and the parameters will be passed to the service</li><li>Automatic handling of exceptions, feedback through `onError`</li></ul> | `(...params: TParams) => void` |
| runAsync | The usage is the same as `run`, but it returns a Promise, so you need to handle the exception yourself. | `(...params: TParams) => Promise<TData>` |
| refresh | Use the last params, call `run` again | `() => void` |
| refreshAsync | Use the last params, call `runAsync` again | `() => Promise<TData>` |
| mutate | Mutate `data` directly | `(data?: TData / ((oldData?: TData) => (TData / undefined))) => void` |
| cancel | Ignore the current promise response | `() => void` |

### Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| manual | <ul><li> The default is `false`. That is, the service is automatically executed during initialization.</li><li>If set to `true`, you need to manually call `run` or `runAsync` to trigger execution. </li></ul> | `boolean` | `false` |
| defaultParams | The parameters passed to the service at the first default execution | `TParams` | - |
| onBefore | Triggered before service execution | `(params: TParams) => void` | - |
| onSuccess | Triggered when service resolve | `(data: TData, params: TParams) => void` | - |
| onError | Triggered when service reject | `(e: Error, params: TParams) => void` | - |
| onFinally | Triggered when service execution is complete | `(params: TParams, data?: TData, e?: Error) => void` | - |

Above we have introduced the most basic functionalities of useRequest, and then we will introduce some more advanced functionalities.
