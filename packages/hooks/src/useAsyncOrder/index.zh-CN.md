---
map:
  # 映射到docs的路径
  path: /useAsyncOrder
---

# useAsyncOrder

管理 异步任务 执行顺序的 Hook

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="3000ms出现第一个数据，2000ms后出现第二个数据"> </demo>

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

## Params

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| task | 异步任务顺序队列 | `((resolve?: Resolve,reject?: interruptibleRejectType,index?: number) => void)[]` |
| option | 配置项 | - |

## Option

| 参数      | 说明         | 类型                    |
| --------- | ------------ | ----------------------- |
| delay     | 延迟执行     | `number`                |
| onReady   | 准备阶段回调 | `void`                  |
| onSuccess | 成功回调     | `(result: any) => void` |
| onError   | 错误回调     | `(err: any) => void`    |
