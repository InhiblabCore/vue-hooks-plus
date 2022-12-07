---
map:
  # 映射到docs的路径
  path: /useFullscreen
---

# useFullscreen

manages DOM full screen.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set elements that need full screen"> </demo>

## Image full screen

<demo src="./demo/demo1.vue"
  language="vue"
  title="Image full screen"
  desc=""> </demo>

## API

```typescript
const [
  isFullscreen,
  {
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
    isEnabled,
  }] = useFullScreen(
    target,
    options?: Options
  );
```

## Params

| Property | Description        | Type      |
| -------- | ------------------ | --------- |
| target   | DOM element or ref | `Element` | `() => Element` | `MutableRefObject<Element>` |
| option   | Setting            | `Options` |

## Options

| Property | Description               | Type         | Default |
| -------- | ------------------------- | ------------ | ------- |
| onExit   | Exit full screen trigger  | `() => void` | -       |
| onEnter  | Enter full screen trigger | `() => void` | -       |

## Result

| Property         | Description          | Type         |
| ---------------- | -------------------- | ------------ |
| isFullscren      | Is full screen       | `boolean`    |
| enterFullscreen  | Enter full screen    | `() => void` |
| exitFullscreen   | Exit full screen     | `() => void` |
| toggleFullscreen | Toggle full screen   | `() => void` |
| isEnabled        | Is enable screenfull | `boolean`    |
