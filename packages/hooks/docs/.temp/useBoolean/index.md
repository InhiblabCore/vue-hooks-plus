---
map:
  path: /useBoolean
  realPath: src/useBoolean/index.md
---

# useBoolean

管理 boolean 状态的 Hook

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="切换 boolean，可以接收默认值。">
</demo>

## API

```typescript
const [state, { toggle, set, setTrue, setFalse }] = useBoolean(
  defaultValue?: boolean,
);
```

### Params

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| defaultValue | 可选项，传入默认的状态值 | `boolean` | `false` |

### Result

| 参数    | 说明     | 类型      |
| ------- | -------- | --------- |
| state   | 状态值   | `Ref<boolean>` |
| actions | 操作集合 | `Actions` |

### Actions

| 参数     | 说明         | 类型                       |
| -------- | ------------ | -------------------------- |
| toggle   | 切换 state   | `() => void`               |
| set      | 设置 state   | `(value: boolean) => void` |
| setTrue  | 设置为 true  | `() => void`               |
| setFalse | 设置为 false | `() => void`               |

