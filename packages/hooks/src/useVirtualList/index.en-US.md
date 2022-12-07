---
map:
  # 映射到docs的路径
  path: /useVirtualList
---

# useVirtualList

A hook that allows you to use virtual list to render huge chunks of list data.

## Code demonstration

### Default usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Render a lot of data"> </demo>

### Dynamic item height

<demo src="./demo/demo1.vue"
  language="vue"
  title="Dynamic item height"
  desc="Specify item height dynamically."> </demo>

## API

```ts
import { useVirtualList } from 'vue-hooks-plus'
```

## Params

| Property |                                           Description |       Type | Default |
| -------- | ----------------------------------------------------: | ---------: | ------: |
| list     | The original list that contains a lot of data entries | `Ref<T[]>` |    `[]` |
| options  |                                                config |  `Options` |     `-` |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| wrapperTarget | nner Container，DOM element or ref | `Ref<TargetValue<HTMLElement>>` | `-` |
| itemHeight | Item height, accept a pixel value or a function that returns the height | `number | ((index: number, data: T) => number)` | `-` |
| overscan | The extra buffer items outside of the view area | `number` | `5` |

## Result

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| list | The current portion of data need to be rendered to DOM | `Ref<{ data: T, index: number }[]>` | `-` |
| ref | Outter Container，support DOM element or ref | `Ref<TargetValue<HTMLElement>>` | `-` |
| onScroll | Scroll to specific index | `(e: any) => void` | `-` |
