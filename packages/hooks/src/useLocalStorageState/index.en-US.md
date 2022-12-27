---
map:
  # 映射到docs的路径
  path: /useLocalStorageState
---

# useLocalStorageState

A Hook that store state into localStorage.

## Code demonstration

### Basic usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Store state into localStorage"
  desc="Refresh this page and you will get the state from localStorage."> </demo>

### Advanced usage

<demo src="./demo/demo1.vue"
  language="vue"
  title="Store complex types of data"
  desc="useLocalStorageState will do the serialization and deserialization work automatically."> </demo>

## API

If you want to delete this record from localStorage, you can use `setState()` or `setState(undefined)`.

```typescript
interface Options<T> {
  defaultValue?: T | (() => T);
  serializer?: (value: T) => string;
  deserializer?: (value: string) => T;
}
const [state, setState] = useLocalStorageState<T>(
  key: string,
  options: Options<T>
): [T?, (value?: T | ((previousState: T) => T)) => void];
```

## Options

| Property     | Description                   | Type                     | Default          |
| ------------ | ----------------------------- | ------------------------ | ---------------- |
| defaultValue | Default value                 | `any \| (() => any)`     | -                |
| serializer   | Custom serialization method   | `(value: any) => string` | `JSON.stringify` |
| deserializer | Custom deserialization method | `(value: string) => any` | `JSON.parse`     |

## Result

| Property | Description         | Type                      |
| -------- | ------------------- | ------------------------- |
| state    | Local Storage-value | `Ref<any` \| `undefined>` |
| setState | Set Storage value   | `SetState`                |

:::warning Remark

useLocalStorageState will call `serializer` before write data to localStorage, and call `deserializer` once after read data.

:::
