---
map:
  # 映射到docs的路径
  path: /useWhyDidYouUpdate
---

# useWhyDidYouUpdate

帮助开发者排查是那个属性改变。

## 代码演示

### 基础用法

<demo src="useWhyDidYouUpdate/demo.vue"
  language="vue"
  title="基本用法"
  desc="控制台查看打印结果">
</demo>

## API

```typescript
type IProps = Record<string, any>;
useWhyDidYouUpdate(componentName: string, props: IProps): void;
```

### Params

| 参数          | 说明                                                                                   | 类型     | 默认值 |
| ------------- | -------------------------------------------------------------------------------------- | -------- | ------ |
| componentName | 必填，观测组件的名称                                                                   | `string` | -      |
| props         | 必填，需要观测的数据（当前组件 `state` 或者传入的 `props` 等可能导致 rerender 的数据） | `Proxy<object>` | -      |

### Result

打开控制台，可以看到改变的属性。
