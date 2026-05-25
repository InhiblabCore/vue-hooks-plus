---
map:
  # Path mapped to docs
  path: /createUseRequestComponent
---

# createUseRequestComponent

A factory that wraps `useRequest` as a render component. It is useful when a team wants to organize loading, error, and success states with template slots while keeping `useRequest` cache, polling, refresh deps, and plugin behavior.

## Code demonstration

### Basic usage

<demo src="createUseRequestComponent/demo.vue"
  language="vue"
  title="Consume useRequest state with slots"
  desc="The component still uses useRequest internally. The default slot receives data, loading, error, run, refresh, and the rest of the result."> </demo>

## API

```typescript
const UseRequest = createUseRequestComponent<TData, TParams, TFormatResult>()
```

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| service | Request service | `(...params: TParams) => Promise<TData>` | - |
| manual | Whether to trigger manually | `boolean` | `false` |
| ready | Whether the request is ready | `Ref<boolean> \| boolean` | `true` |
| refreshDeps | Dependencies that refresh the request when changed | `any[]` | `[]` |
| plugins | `useRequest` plugins | `UseRequestPlugin[]` | `[]` |
| formatResult | Format response data | `(res: TData) => TFormatResult` | - |

| Slot | Description |
| --- | --- |
| default | Rendered outside loading/error states. Receives the full `useRequest` result |
| loading | Rendered while loading |
| error | Rendered on error. Receives `{ error }` |
