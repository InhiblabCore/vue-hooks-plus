---
map:
  # 映射到docs的路径
  path: /useRequest/middleware/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequest.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/middleware/demo/demo.vue
---

# Middleware Beta

Middleware is a new beta feature, please upgrade to the latest version for use. It allows you to execute code before and after the useRequest hook.

## Usage

The middleware receives a useRequest hook and can execute logic before and after running it. If there are multiple middleware, each middleware is packaged with the next middleware. The last middleware in the list will receive the original hook useRequest

## Principle

```
enter a
  enter b
    enter c
      useRequest()
    exit  c
  exit  b
exit  a

```

## A simple request log retention middleware

<demo src="request-middleware/demo.vue"
  language="vue"
  title=""
  desc=""> </demo>

## API

```typescript
const { data } = useRequest(() => getUsername(), {
  ready,
  use: [middleware],
})
```
