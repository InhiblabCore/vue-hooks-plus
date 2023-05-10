---
map:
  # 映射到docs的路径
  path: /useExternal
---

# useExternal

Dynamically load JS or CSS, useExternal can ensure that the resource are globally unique.

## Code demonstration

### Basic Usage

<demo src="./demo/demo.vue"
  language="vue"
  title="Dynamically load JS"
  desc="load axios"> </demo>

### Load CSS

<demo src="./demo/demo1.vue"
  language="vue"
  title="Load style"
  desc="load css file"> </demo>

## API

```typescript
const status = useExternal(path: string, options?: Options);
```

## Params

| Property | Description                       | Type     | Default |
| -------- | --------------------------------- | -------- | ------- |
| path     | The url of the external resources | `string` | -       |

## Result

| Property | Description | Type |
| --- | --- | --- |
| status | The progress of loading the external resources, support `unset`, `loading`, `ready`, `error` | `Readonly<Ref<UseExternalStatus>>` |

## Options

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| type | The type of extarnal resources which need to load, support `js`/`css`, if no type, it will deduced according to path | `string` | - |
| js | Attributes supported by `script` | `HTMLScriptElement` | - |
| css | Attributes supported by `link` | `HTMLStyleElement` | - |
