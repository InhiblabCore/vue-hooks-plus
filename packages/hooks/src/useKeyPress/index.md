---
map:
  # 映射到docs的路径
  path: /useKeyPress
---

# useKeyPress

监听键盘按键，支持组合键，支持按键别名的 Hook

## 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="支持键盘事件中的 keyCode 和别名，请按 ArrowUp 或 ArrowDown 键进行演示。"> </demo>

## 监听组合按键

<demo src="./demo/demo1.vue"
  language="vue"
  title="监听组合键"
  desc=""> </demo>

## 精确匹配

<demo src="./demo/demo2.vue"
  language="vue"
  title="精确匹配"
  desc="通过配置 exactMatch, 开启精确匹配。比如按 [shift + c] ，不会触发 [c]。"> </demo>

## API

```typescript
const state = useKeyPress(target?: Target);
```

### Params

| 参数   | 说明             | 类型                                                                                      |
| ------ | ---------------- | ---------------------------------------------------------------------------------------- |
| keyFilter | 键盘输入的当前键 | `Number` \| `String` \| `Number[] `\| `String[]` \|`(event: KeyboardEvent) => boolean` |
| eventHandler | 事件处理 | `(event: KeyboardEvent) => void `                                                  |
| option | 额外的配置项 | `Options`                                                                                    |

### Options

| 参数     | 说明                                           | 类型                                       | 默认值 |
| -------- | ---------------------------------------------- | ----------------------------------------- | ------ |
| events  | 当所监听的事件类型触发时，接收到的一个事件通知对象   | `EventListenerOrEventListenerObject`      | -      |
| target  | DOM 节点或者 Ref                                | `HTMLElement` \| `Document` \| `Window`   | -      |
| exactMatch | 是否准确匹配                                  | `Boolean`                                 | -      |


