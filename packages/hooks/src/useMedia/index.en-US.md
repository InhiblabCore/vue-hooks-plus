---
map:
  # 映射到docs的路径
  path: /useMedia
---

# useMedia

Hook using media queries.

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="For media queries-Minimum size of 320 px"> </demo>

## API

```javascript
const value = useMedia(['(min-width: 320px)'], [true], false)
```

## Options

| Property     | Description                                   | Type        | Default |
| ------------ | --------------------------------------------- | ----------- | ------- |
| queries      | Media to query for an array of objects        | `string[]`  | -       |
| values       | The default value for each media query object | `boolean[]` | -       |
| defaultValue | DefaultValue                                  | `boolean`   |

## Result

| Property | Description               | Type                     |
| -------- | ------------------------- | ------------------------ |
| value    | Compliance with the query | `Readonly<Ref<boolean>>` |
