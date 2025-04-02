---
map:
  # 映射到docs的路径
  path: /useKeyPress
---

# useKeyPress

Listen for the keyboard press, support key combinations, and support alias.

## Basic usage

<demo src="useKeyPress/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Supported keyCode and alias in keyboard events, pressing ArrowUp or ArrowDown to show effect."> </demo>

## Combination keys

<demo src="useKeyPress/demo1.vue"
  language="vue"
  title="Combination keys"
  desc=""> </demo>

## Exact match

<demo src="useKeyPress/demo2.vue"
  language="vue"
  title="Exact match"
  desc="Enable exact matching by setting exactMatch. For example, press [shift + c], will not trigger [c]."> </demo>

## API

```typescript
const state = useKeyPress(target?: Target);
```

## Params

| Property | Description | Type |
| --- | --- | --- |
| keyFilter | Support keyCode、alias、combination keys、array、custom function | `Number` \| `String` \| `Number[]`\| `String[]` \|`(event: KeyboardEvent) => boolean` |
| eventHandler | Callback function | `(event: KeyboardEvent) => void` |
| option | advanced options | `Options` |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| events | Trigger Events | `EventListenerOrEventListenerObject` | - |
| target | DOM element or ref | `HTMLElement` \| `Document` \| `Window` | - |
| exactMatch | Exact match. If set true, the event will only be trigger when the keys match exactly. For example, pressing [shif + c] will not trigger [c] | `Boolean` | - |
