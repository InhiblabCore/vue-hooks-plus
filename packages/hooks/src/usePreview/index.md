---
map:
  # 映射到docs的路径
  path: /usePreview
---

# usePreview

用于预览md和vue组件视图的 hook

## 代码演示

### 基础用法
 <demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="预览视图">
</demo>

## API

```typescript
const { container } = usePreview(target)

```

### Params

| 参数   | 说明             | 类型                                                        |
| ------ | ---------------- | ----------------------------------------------------------- |
| target | DOM 节点或者 Ref | `VueComponent` \| `string` \| `JSX.Element` |

### Result

| 参数   | 说明             | 类型                                                        |
| ------ | ---------------- | ----------------------------------------------------------- |
| container | DOM 节点或者 Ref | `Element` \| `() => Element` \| `JSX.Element` |
