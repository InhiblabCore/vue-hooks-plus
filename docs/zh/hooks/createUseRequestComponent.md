---
map:
  # 映射到docs的路径
  path: /createUseRequestComponent
---

# createUseRequestComponent

把 `useRequest` 包装成渲染函数组件的工厂。适合团队希望用模板 slot 组织加载态、错误态、成功态，同时仍复用 `useRequest` 的缓存、轮询、依赖刷新、插件等能力。

## 代码演示

### 基础用法

<demo src="createUseRequestComponent/demo.vue"
  language="vue"
  title="用 slot 消费 useRequest 状态"
  desc="组件内部仍使用 useRequest，默认插槽会收到 data、loading、error、run、refresh 等完整结果。"> </demo>

## API

```typescript
const UseRequest = createUseRequestComponent<TData, TParams, TFormatResult>()
```

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| service | 请求函数 | `(...params: TParams) => Promise<TData>` | - |
| manual | 是否手动触发请求 | `boolean` | `false` |
| ready | 是否准备好发起请求 | `Ref<boolean> \| boolean` | `true` |
| refreshDeps | 依赖变化后重新请求 | `any[]` | `[]` |
| plugins | `useRequest` 插件 | `UseRequestPlugin[]` | `[]` |
| formatResult | 格式化响应数据 | `(res: TData) => TFormatResult` | - |

| 插槽 | 说明 |
| --- | --- |
| default | 请求成功或非 loading/error 状态下渲染，参数为 `useRequest` 返回值 |
| loading | loading 时渲染 |
| error | error 时渲染，参数为 `{ error }` |
