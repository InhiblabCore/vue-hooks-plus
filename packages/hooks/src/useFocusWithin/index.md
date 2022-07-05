---
map:
  # 映射到docs的路径
  path: /useFocusWithin
---

# useFocusWithin

监听当前焦点是否在某个区域之内，同 css 属性 [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="使用 ref 设置需要监听的区域。可以通过鼠标点击外部区域，或者使用键盘的 tab 等按键来切换焦点。">
</demo>


## API

```typescript
const isFocusWithin = useFocusWithin(
  target,
  {
   onFocus,
   onBlur,
   onChange
  }
);
```

### Params

| 参数    | 说明                  | 类型                                                        | 默认值 |
| ------- | --------------------- | ----------------------------------------------------------- | ------ |
| target  | DOM 节点或者 Ref 对象 | `() => Element` \| `Element` \| `JSX.Element` | -      |
| options | 额外的配置项          | `Options`                                                   | -      |

### Options

| 参数     | 说明           | 类型                               | 默认值 |
| -------- | -------------- | ---------------------------------- | ------ |
| onFocus  | 获取焦点时触发 | `(e: FocusEvent) => void`          | -      |
| onBlur   | 失去焦点时触发 | `(e: FocusEvent) => void`          | -      |
| onChange | 焦点变化时触发 | `(isFocusWithin: boolean) => void` | -      |

### Result

| 参数          | 说明               | 类型      |
| ------------- | ------------------ | --------- |
| isFocusWithin | 焦点是否在当前区域 | `Ref<boolean>` |
