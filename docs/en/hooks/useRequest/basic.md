---
map:
  # Path mapped to docs
  path: /useRequest/basic/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequest.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/basic/demo
---

# useRequest Basic usage

we will introduce the core and basic functionalities of `useRequest`, that is, the functionalities of the `useRequest` kernel.

## Default request

By default, the first parameter of `useRequest` is an asynchronous function, which is automatically executed when the component is initialized. At the same time, it automatically manages the status of `loading`, `data`, `error` of the asynchronous function.

```js
const { data, error, loading } = useRequest(service)
```

<br />

<demo src="useRequest/demo.vue"
  language="vue"
  title=""
  desc="The fetch request is sent by default"> </demo>

## Manually trigger

If `options.manual = true` is set, `useRequest` will not be executed by default, and the execution needs to be triggered by `run` or `runAsync`.

```tsx | pure
const { loading, run, runAsync } = useRequest(service, {
  manual: true,
})
;<button onClick={run} disabled={loading}>
  {loading ? 'Loading' : 'Edit'}
</button>
```

<br />

The difference between `run` and `runAsync` is:

- `run` is a normal synchronous function, we will automatically catch the exception, you can use `options.onError` to handle the behavior of the exception.
- `runAsync` is a asynchronous function that returns a `Promise`. If you use `runAsync` to call it, it means you need to catch the exception yourself.

  ```ts
  runAsync()
    .then(data => {
      console.log(data)
    })
    .catch(error => {
      console.log(error)
    })
  ```

  <br />

Next, we will demonstrate the difference between `run` and `runAsync` through the simple scenario of editing the username.

<demo src="useRequest/demo1.vue"
  language="vue"
  title="run actively sends requests"
  desc="In this example, we modify the username by running, and handle success and failure by onSuccess and onError."> </demo>

<demo src="useRequest/demo2.vue"
  language="vue"
  title="runAsync actively sends requests"
  desc="In this example, we use runAsync to modify the username, and we must use catch to handle exceptions ourselves."> </demo>

## Concurrent Request Mechanism

Starting from version `2.4.0`, `useRequest` introduces a concurrent request mechanism. The key features of this mechanism are:

1. Requests are not interrupted by the cancel count mechanism
2. Each manual request call executes independently
3. Each request triggers its corresponding callback functions (such as onSuccess)

### Usage Example

```typescript
const { run } = useRequest(
  async (id: number, { signal }) => {
    const response = await fetch(`https://api.example.com/data/${id}`);
    return response.json();
  }
);

// These requests will execute concurrently without affecting each other
run(1); // will trigger onSuccess
run(2); // will trigger onSuccess
run(3); // will trigger onSuccess
```

### Notes

- Each request is independent and won't be interrupted by the cancellation of other requests
- All request callback functions will execute normally
- Suitable for scenarios where multiple requests need to be initiated simultaneously

:::info Parameter Management Enhancement
If you need better parameter support and management, you can use `useFetchs`. This hook provides enhanced capabilities for handling multiple parameters and complex request scenarios.
:::

## The life cycle

`useRequest` provides the following life cycle for you to do some processing in different stages of asynchronous functions.

- `onBefore`: Triggered before the request
- `onSuccess`: Triggered when the request is resolved
- `onError`: Triggered when the request is rejected
- `onFinally`: Triggered when the request is completed

<demo src="useRequest/demo3.vue"
  language="vue"
  title=""
  desc=""> </demo>

## Refresh (repeat the last request)

`useRequest` provides the `refresh` and `refreshAsync` methods so that we can use the last parameters to re-run the request.

If in the scenario of reading user information

1. We read the user information with ID 1 `run(1)`
2. We updated user information by some ways
3. We want to re-initiate the last request, then we can use `refresh` instead of `run(1)`, which is very useful in scenarios with complex parameters

<demo src="useRequest/demo4.vue"
     language="vue"
     title=""
     desc=""> </demo>

Of course, the difference between `refresh` and `refreshAsync` is the same as `run` and `runAsync`.

## Change data immediately

### optimisticData

`useRequest` provides `mutate`, which can immediate modify the `data`.

The usage of `mutate` is consistent with `React.setState`, supports: `mutate(newData)` and `mutate((oldData) => newData)`.

In the following example, we demonstrate a scenario of `mutate`.

We have modified the user name, but we do not want to wait for the request to be successful before giving feedback to the user. Instead, modify the data directly, then call the modify request in background, and provide additional feedback after the request returns.

### error rollback

When you use `mutate`, it is possible that the remote data change fails after the optimistic data is displayed to the user. In this case, you can enable `rollbackOnError`, which restores the local cache to its previous state, ensuring that the user sees Got the correct data.

<demo src="useRequest/demo5.vue"
     language="vue"
     title=""
     desc=""> </demo>

## Cancel response

`useRequest` provides a `cancel` function, which will **ignore** the data and erros returned by the current promise

**Note: Calling `cancel` doesn't cancel the execution of promise**

At the same time, `useRequest` will automatically ignore the response at the following timing:

- When the component is unmounting, the ongoing promise
- Race cancellation, when the previous promise has not returned, if the next promise is initiated, the previous promise will be ignored

<demo src="useRequest/demo6.vue"
     language="vue"
     title=""
     desc=""> </demo>

## Parameter management

The `params` returned by `useRequest` will record the parameters of `service`. For example, if you trigger `run(1, 2, 3)`, then `params` is equal to `[1, 2, 3]`.

If we set `options.manual = false`, the parameters of calling `service` for the first time can be set by `options.defaultParams`.

<demo src="useRequest/demo7.vue"
     language="vue"
     title=""
     desc=""> </demo>

## API

```ts
const {
  loading: Readonly<Ref<boolean>>,
  data?: Readonly<Ref<TData>>,
  error?: Readonly<Ref<Error>>,
  params: Readonly<Ref<TParams | []>>,
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
    concurrent?: boolean,
  }
);
```

## Result

| Property | Description | Type |
| --- | --- | --- |
| data | Data returned by service | `Readonly<Ref<TData>>` \| `undefined` |
| error | Exception thrown by service | `Readonly<Ref<Error>>` \| `undefined` |
| loading | Is the service being executed | `Readonly<Ref<boolean>>` |
| params | An array of parameters for the service being executed. For example, you triggered `run(1, 2, 3)`, then params is equal to `[1, 2, 3]` | `Readonly<Ref<TParams \| []>>` |
| run | <ul><li> Manually trigger the execution of the service, and the parameters will be passed to the service</li><li>Automatic handling of exceptions, feedback through `onError`</li></ul> | `(...params: TParams) => void` |
| runAsync | The usage is the same as `run`, but it returns a Promise, so you need to handle the exception yourself. | `(...params: TParams) => Promise<TData>` |
| refresh | Use the last params, call `run` again | `() => void` |
| refreshAsync | Use the last params, call `runAsync` again | `() => Promise<TData>` |
| mutate | Mutate `data` directly | `(data?: TData \| ((oldData?: TData) => (TData \| undefined))) => void` |
| cancel | Ignore the current promise response | `() => void` |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| initialData | Init data | `TData` \| `undefined` |
| manual | <ul><li> The default is `false`. That is, the service is automatically executed during initialization.</li><li>If set to `true`, you need to manually call `run` or `runAsync` to trigger execution. </li></ul> | `boolean` | `false` |
| defaultParams | The parameters passed to the service at the first default execution | `TParams` | - |
| formatResult | Format the request results,v1 which recommend to use `useFormatResult` | `(response: TData) => FormatData` | - |
| onBefore | Triggered before service execution | `(params: TParams) => void` | - |
| onSuccess | Triggered when service resolve | `(data: TData, params: TParams) => void` | - |
| onError | Triggered when service reject | `(e: Error, params: TParams) => void` | - |
| onFinally | Triggered when service execution is complete | `(params: TParams, data?: TData, e?: Error) => void` | - |
| concurrent | <ul><li>Whether to allow concurrent requests</li><li>When set to `true`, multiple requests can be executed concurrently</li><li>When set to `false`, new requests will cancel previous ones</li><li>Default is `false`</li></ul> | `boolean` | `false` |

:::info 🛸 PRO

Above we have introduced the most basic functionalities of useRequest, and then we will introduce some more advanced functionalities.

:::
