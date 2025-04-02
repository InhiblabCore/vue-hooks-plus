---
map:
  # 映射到docs的路径
  path: /useWhyDidYouUpdate
---

# useWhyDidYouUpdate

Help developers troubleshoot what changes have caused component rerender.

## Code demonstration

<demo src="useWhyDidYouUpdate/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Console to view the print results"> </demo>

## API

```typescript
type IProps = Record<string, any>;
useWhyDidYouUpdate(componentName: string, props: IProps): void;
```

### Params

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| componentName | Required, the name of the observation component | `string` | - |
| props | Required, data to be observed (`state` or `props` and other data that may lead to rerender) | `Proxy<object>` | - |

### Result

Please open the browser console, you can see the output of the changed observed `state` or `props`.
