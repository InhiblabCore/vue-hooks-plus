---
map:
  # 映射到docs的路径
  path: /useLocalStorageState
---

# useLocalStorageState

将状态存储在 localStorage 中的 Hook 。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="将 state 存储在 localStorage 中"
  desc="刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。">
</demo>

### 高级用法-存储复杂类型

<demo src="./demo/demo1.vue"
  language="vue"
  title="存储数组或对象等复杂类型"
  desc="会自动进行序列化和反序列化">
</demo>

## API

如果想从 localStorage 中删除这条数据，可以使用 `setState()` 或 `setState(undefined)` 。

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
### Options
| 参数         | 说明               | 类型                     | 默认值           |
| ------------ | ------------------ | ------------------------ | ---------------- |
| defaultValue | 默认值             | `any \| (() => any)`     | -                |
| serializer   | 自定义序列化方法   | `(value: any) => string` | `JSON.stringify` |
| deserializer | 自定义反序列化方法 | `(value: string) => any` | `JSON.parse`     |

### Result

| 参数     | 说明           | 类型                    |
| -------- | -------------- | ----------------------- |
| state    | 本地 Storage 值 | `Ref<any` \| `undefined>` |
| setState | 设置 Storage 值 | `SetState`              |

### 注意
useLocalStorageState 在往 localStorage 写入数据前，会先调用一次 `serializer`，在读取数据之后，会先调用一次 `deserializer`。