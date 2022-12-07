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
    reset
  }
] = useSet(initialValue?: Iterable<K>);
```

## Result

| Property | Description      | Type                 |
| -------- | ---------------- | -------------------- |
| set      | Set object       | `Ref<Set>`           |
| add      | Add item         | `(key: any) => void` |
| remove   | Remove item      | `(key: any) => void` |
| reset    | Reset to default | `() => void`         |

## Params

| Property     | Description                 | Type          | Default |
| ------------ | --------------------------- | ------------- | ------- |
| initialValue | Optional, set default value | `Iterable<K>` | -       |
