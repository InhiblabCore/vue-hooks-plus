---
map:
  # 映射到docs的路径
  path: /useRequest/middleware/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/useRequest.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/middleware/demo/demo.vue
---

# 中间件 Beta

中间件是新增的一个 beta 功能，请升级最新版使用。它让你能够在 useRequest hook 之前和之后执行代码。

## 用法

中间件接收 useRequest hook，可以在运行它之前和之后执行逻辑。如果有多个中间件，则每个中间件包装下一个中间件。列表中的最后一个中间件将接收原始的 hook useRequest。

## 原理

```
enter a
  enter b
    enter c
      useRequest()
    exit  c
  exit  b
exit  a

```

## 一个简单的请求日志保留中间件

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
