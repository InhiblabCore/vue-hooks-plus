---
map:
  # 映射到docs的路径
  path: /useSessionStorageState
---

# useSessionStorageState

A hook for storing state in `sessionStorage`. It is useful for form drafts, filters, and other temporary values that should survive refreshes but stay scoped to the current browser session.

## Code demonstration

### Basic usage

<demo src="useSessionStorageState/demo.vue"
  language="vue"
  title="Store state in sessionStorage"
  desc="The input value is restored after refresh. The browser clears it when the current tab session ends."> </demo>

### Store complex values

<demo src="useSessionStorageState/demo1.vue"
  language="vue"
  title="Store arrays or objects"
  desc="JSON serialization is used by default. You can also provide serializer and deserializer."> </demo>

## API

The usage is the same as `useLocalStorageState`; the storage backend is the current session's `sessionStorage`.

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
