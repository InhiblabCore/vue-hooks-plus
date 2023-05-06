---
map:
  # 映射到docs的路径
  path: /useMap
---

# useMap

A hook that can manage the state of Map.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc=""> </demo>

## API

```typescript
const [
  map,
  {
    set,
    setAll,
    remove,
    reset,
    get
  }
] = useMap(initialValue?: Iterable<[any, any]>);
```

## Result

| Property | Description      | Type                                     |
| -------- | ---------------- | ---------------------------------------- |
| map      | Map object       | `Readonly<Ref<Map>>`                     |
| set      | Add item         | `(key: any, value: any) => void`         |
| get      | Get item         | `(key: any) => MapItem`                  |
| setAll   | Set a new Map    | `(newMap: Iterable<[any, any]>) => void` |
| remove   | Remove key       | `(key: any) => void`                     |
| reset    | Reset to default | `() => void`                             |
| clear    | clear Map        | `() => void`                             |

## Params

| Property     | Description                 | Type                   | Default |
| ------------ | --------------------------- | ---------------------- | ------- |
| initialValue | Optional, set default value | `Iterable<[any, any]>` | -       |
