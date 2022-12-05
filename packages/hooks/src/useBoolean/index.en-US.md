---
map:
# Path mapped to docs
path: /useBoolean
---

# useBoolean

A hook that elegantly manages boolean state.

### Basic usage

<demo src="./demo/demo.vue" 
language="vue" 
title="Basic usage" 
desc="Toggle boolean to receive default value."> </demo>

## API

```typescript
const [state, { toggle, set, setTrue, setFalse }] = useBoolean(
defaultValue? : boolean,
);
```

### Params

| Property     | Description                               | Type      | Default |
| ------------ | ----------------------------------------- | --------- | ------- |
| defaultValue | The default value of the state. Optional. | `boolean` | `false` |

### Result

| Property | Description                            | Type           |
| -------- | -------------------------------------- | -------------- |
| state    | Current value                          | `Ref<boolean>` |
| actions  | A set of methods to update state value | `Actions`      |

### Actions

| Property | Description          | Type                       |
| -------- | -------------------- | -------------------------- |
| toggle   | Toggle state         | `() => void`               |
| set      | Set state            | `(value: boolean) => void` |
| setTrue  | Set state to `true`  | `() => void`               |
| setFalse | Set state to `false` | `() => void`               |
