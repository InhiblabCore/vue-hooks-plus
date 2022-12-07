---
map:
  # 映射到docs的路径
  path: /useFocusWithin
---

# useFocusWithin

Monitor whether the current focus is within a certain area, Same as css attribute [:focus-within](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-within)。

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Use ref to set area that needs monitoring. The focus can be switched by click the outside with the mouse, or using keys such as tab on the keyboard."> </demo>

## API

```typescript
const isFocusWithin = useFocusWithin(target, {
  onFocus,
  onBlur,
  onChange,
})
```

## Params

| Property | Description        | Type                                          | Default |
| -------- | ------------------ | --------------------------------------------- | ------- |
| target   | DOM element or ref | `() => Element` \| `Element` \| `JSX.Element` | -       |
| options  | More config        | `Options`                                     | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| onFocus | Callback to be executed on focus | `(e: FocusEvent) => void` | - |
| onBlur | Callback to be executed on blur | `(e: FocusEvent) => void` | - |
| onChange | Callback to be executed on focus change | `(isFocusWithin: boolean) => void` | - |

## Result

| Property      | Description                              | Type           |
| ------------- | ---------------------------------------- | -------------- |
| isFocusWithin | Whether the focus is in the current area | `Ref<boolean>` |
