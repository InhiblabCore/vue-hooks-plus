---
map:
  # 映射到docs的路径
  path: /useFull
---

# useFullscreen

manages DOM full screen.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Enter full screen without passing ref"> </demo>

## Image full screen

<demo src="./demo/demo1.vue"
  language="vue"
  title="Image full screen"
  desc="Pass the ref setting element into full screen"> </demo>

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

| Property       | Description                 | Type                     | Default |
| -------------- | --------------------------- | ------------------------ | ------- |
| onExit         | Exit full screen trigger    | `() => void`             | -       |
| onEnter        | Enter full screen trigger   | `() => void`             | -       |
| defaultElement | Default full screen element | `Element \| HTMLElement` | `html`  |

## Result

| Property         | Description          | Type                     |
| ---------------- | -------------------- | ------------------------ |
| isFullscren      | Is full screen       | `Readonly<Ref<boolean>>` |
| enterFullscreen  | Enter full screen    | `() => void`             |
| exitFullscreen   | Exit full screen     | `() => void`             |
| toggleFullscreen | Toggle full screen   | `() => void`             |
| isEnabled        | Is enable screenfull | `boolean`                |
