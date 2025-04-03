---
map:
  # 映射到docs的路径
  path: /useUrlState
---

# useUrlState

A hook that store the state into url query.

## Install

```bash
npm i @vue-hooks-plus/use-url-state
```


## Code demonstration

<demo src="useUrlState/demo.vue"
language="vue"
title="Default usage"
desc="Store the state into url query. By set the value to undefined, the attribute can be removed from the url query."> </demo>

## API

```typescript
const state = useUrlState(defaultState, {
  localStorageKey: 'localStorageKey',
  routerPushFn,
})

interface UseUrlStateOptions {
  localStorageKey?: string
}
```

## Params

| Property | Description | Type | Default |
| --- | --- | --- | --- |
| initialState | default | `S` \| `() => S` | - |
| options | When setting `localStorageKey`, if url has no parameter, the value of localStorage is used |
| UseUrlStateOptions | - |  | routerPushFn | In general, the `router.push` method of passing the vue-router just works | `function` | - |

## Result

| Property | Description      | Type |
| -------- | ---------------- | ---- |
| state    | Url query object | -    |
