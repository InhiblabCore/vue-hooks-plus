---
map:
  # Path mapped to docs
  path: /useAsyncOrder
---

# useAsyncOrder

Hook to manage the execution order of asynchronous tasks

## Code demonstration

### Basic usage

<demo src="./demo/demo.vue"
  Language = "vue" title = "Basic Usage" desc = "The first data appears after 3000ms, and the second data appears after 2000ms" > </demo>

## API

```typescript
useAsyncOrder({
  task: ((
		resolve?: Resolve,
		reject?: interruptibleRejectType,
		index?: number
	) => void)[]
	option?: {
		delay?: number
		onReady?: () => void
		onSuccess?: (result: any) => void
		onError?: (err: any) => void
	}})
```

### Params

| Property | Description | Type |
| --- | --- | --- |
| task | aynchronous task order queue | `((resolve?: Resolve,reject?: interruptibleRejectType,index?: number) => void)[]` |
| option | option | - |

### Option

| Property  | Description                | Type                    |
| --------- | -------------------------- | ----------------------- |
| delay     | delay execution            | `number`                |
| onReady   | Preparation phase callback | `void`                  |
| onSuccess | successful callback        | `(result: any) => void` |
| onError   | error callback             | `(err: any) => void`    |
