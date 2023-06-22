---
map:
  # Path mapped to docs
  path: /useLongPress
---

# useLongPress

监听 Element 的长按事件。

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="监听 Element 的长按事件。"> </demo>

## API

```typescript
const { isPressing , pressingTime } = useLongPress(target: BasicTarget , options?: LongPressOptions)
```

## Result

| 参数           | 说明                                   | 类型                       |
|--------------|--------------------------------------|--------------------------|
| isPressing   | 表示当前按压状态。如果正在按压，值为 true；否则，值为 false。 | `Readonly<Ref<boolean>>` |
| pressingTime | 表示按压的持续时间（可能以毫秒为单位）。此值仅在按压期间更新。      | `Readonly<Ref<number>>`  |

## Params

| 参数      | 说明            | 类型                                                          | Default |
|---------|---------------|-------------------------------------------------------------|---------|
| target  | DOM元素 或 Ref引用 | `() => Element` \| `Element` \| `MutableRefObject<Element>` | -       |
| options | 配置選項          | `UseLongPressOptions`                                       | -       |

### DropOptions

| 参数            | 说明                         | 类型                   | Default |
|---------------|----------------------------|----------------------|---------|
| delay         | 触发 longpress 事件前的延迟时间（毫秒）  | `number`             | 500     |
| minUpdateTime | 更新 longpress 事件时间的最小间隔（毫秒） | `number`             | 100     |
| cancelOnMove  | 是否在发生移动时取消 longpress 事件    | `boolean`            | true    |
| modifiers     | longpress 事件修饰符            | `LongPressModifiers` | -       |

### LongPressModifiers

| 参数      | 说明              | 类型        | Default |
|---------|-----------------|-----------|---------|
| stop    | 停止传播事件          | `boolean` | -       |
| once    | 只监听事件监听器一次      | `boolean` | -       |
| prevent | 阻止默认事件          | `boolean` | -       |
| capture | 事件监听器捕获选项       | `boolean` | -       |
| self    | 检查事件目标元素是否与自身相同 | `boolean` | -       |
