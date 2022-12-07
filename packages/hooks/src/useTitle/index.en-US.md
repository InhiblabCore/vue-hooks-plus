---
map:
  # 映射到docs的路径
  path: /useTitle
---

# useTitle

A hook that set title of the page.

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Set title of the page."> </demo>

## API

```typescript
useTitle(title: string, options?: Options);
```

## Params

| Property | Description | Type          | Default |
| -------- | ----------- | ------------- | ------- |
| title    | Page title  | `Ref<string>` | -       |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| restoreOnUnmount | Whether to restore the previous page title when the component is unmounted | `boolean` | `false` |
