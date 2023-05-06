---
map:
  # 映射到docs的路径
  path: /useMap
---

# useMap

管理 Map 类型状态的 Hook。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
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

| 参数   | 说明                  | 类型                                     |
| ------ | --------------------- | ---------------------------------------- |
| map    | Map 对象              | `Readonly<Ref<Map>>`                     |
| set    | 添加元素              | `(key: any, value: any) => void`         |
| get    | 获取元素              | `(key: any) => MapItem`                  |
| setAll | 生成一个新的 Map 对象 | `(newMap: Iterable<[any, any]>) => void` |
| remove | 移除元素              | `(key: any) => void`                     |
| reset  | 重置为默认值          | `() => void`                             |
| clear  | 清空 Map 对象         | `() => void`                             |

## Params

| 参数         | 说明                        | 类型                   | 默认值 |
| ------------ | --------------------------- | ---------------------- | ------ |
| initialValue | 可选项，传入默认的 Map 参数 | `Iterable<[any, any]>` | -      |
