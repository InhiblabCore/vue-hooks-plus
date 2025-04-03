---
map:
  # Path mapped to docs
  path: /useAsyncOrder
---

# useAsyncOrder

Hook to manage the execution order of asynchronous tasks

## Code demonstration

### Basic usage

<demo src="useAsyncOrder/demo.vue"
  Language = "vue" title = "Basic Usage" desc = "The first data appears after 3000ms, and the second data appears after 2000ms" > </demo>

## API

```typescript
useAsyncOrder({
  task: ((
  resolve?: Resolve,
  reject?: InterruptibleRejectType,
  index?: number
 ) => void)[]
 option?: {
  delay?: number
  onReady?: () => void
  onSuccess?: (result: unknown) => void
  onError?: (err: unknown) => void
 }})
```

## Params

| Property | Description | Type |
| --- | --- | --- |
| task | aynchronous task order queue | `((resolve?: Resolve,reject?: InterruptibleRejectType,index?: number) => void)[]` |
| option | option | - |

## Option

| Property  | Description                | Type                        |
| --------- | -------------------------- | --------------------------- |
| delay     | Delay execution            | `number`                    |
| onReady   | Preparation phase callback | `void`                      |
| onSuccess | Successful callback        | `(result: unknown) => void` |
| onError   | Error callback             | `(err: unknown) => void`    |
