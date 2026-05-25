---
map:
  # 映射到docs的路径
  path: /useSessionStorageState
---

# useSessionStorageState

将状态存储在 `sessionStorage` 中的 Hook，适合只需要在当前标签页会话内保留的表单、筛选条件、临时草稿等状态。

## 代码演示

### 基础用法

<demo src="useSessionStorageState/demo.vue"
  language="vue"
  title="将 state 存储在 sessionStorage 中"
  desc="刷新页面后会恢复输入内容；关闭当前标签页后，浏览器会清理这份会话级状态。"> </demo>

### 存储复杂类型

<demo src="useSessionStorageState/demo1.vue"
  language="vue"
  title="存储数组或对象"
  desc="默认使用 JSON 序列化，也可以通过 serializer 和 deserializer 自定义。"> </demo>

## API

用法与 `useLocalStorageState` 一致，只是存储介质从 `localStorage` 换成当前会话的 `sessionStorage`。

```typescript
interface Options<T> {
  defaultValue?: T | (() => T)
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

const [state, setState] = useSessionStorageState<T>(
  key: string,
  options: Options<T>
): [T?, (value?: T | ((previousState: T) => T)) => void]
```
