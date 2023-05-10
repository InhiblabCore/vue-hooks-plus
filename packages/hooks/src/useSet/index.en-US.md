---
map:
  # 映射到docs的路径
  path: /useSet
---

# useSet

A hook that can manage the state of Set.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc=""> </demo>

## API

```typescript
const [
  set,
  {
    add,
    remove,
    reset,
    has,
    clear
  }
] = useSet(initialValue?: Iterable<K>);
```

## Result

| Property | Description      | Type                 |
| -------- | ---------------- | -------------------- |
| set      | Set object       | `Readonly<Ref<Set>>` |
| add      | Add item         | `(key: T) => void`   |
| remove   | Remove item      | `(key: T) => void`   |
| clear    | Clear Set        | `() => void`         |
| has      | Set has          | `(key: T) => void`   |
| reset    | Reset to default | `() => void`         |

## Params

| Property     | Description                 | Type          | Default |
| ------------ | --------------------------- | ------------- | ------- |
| initialValue | Optional, set default value | `Iterable<K>` | -       |
