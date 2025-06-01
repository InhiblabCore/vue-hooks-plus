# useRequest

`useRequest` 组件是基于 `useRequest` hook 的高阶封装，允许你以声明式、组件化的方式使用所有 `useRequest` 的强大功能。

## 组件用法 `2.4.0-beta`

你可以直接在模板中使用 `<use-request />` 组件来处理数据请求、加载、错误和成功等状态。组件的 API 和 props 与 `useRequest` hook 完全一致，方便在两种用法间切换。

### 基本示例

```vue
<use-request
  :service="fetchData"
  :refreshDeps="[someDep]"
  :initialData="'default'"
>
  <template #default="{ data, loading, error, refresh }">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误：{{ error.message }}</div>
    <div v-else>数据：{{ data }}</div>
    <button @click="refresh">刷新</button>
  </template>
</use-request>
```

## API 说明

- `service`：返回 Promise 的函数（必填）
- `refreshDeps`：依赖项数组，变化时自动刷新
- `initialData`：初始数据
- `manual`：是否手动触发
- `onSuccess`、`onError`、`onFinally`：生命周期回调
- 以及所有 `useRequest` hook 支持的其他参数

#### 插槽

- `default`：插槽参数包括 `{ data, loading, error, refresh, ... }`，与 `useRequest` hook 返回值一致
- `loading`：自定义加载 UI
- `error`：自定义错误 UI

### 与 useRequest hook 的一致性

所有功能、参数和返回值都与 `useRequest` hook 保持一致。详细 API 可参考 [useRequest hook 文档](../hooks/useRequest.md)。

---

## 使用 createUseRequestComponent

除了内置的 `<use-request />` 组件，你还可以通过 `createUseRequestComponent` 工具函数，生成带有自定义类型或行为的请求组件。

### 为什么要用 createUseRequestComponent？

- **类型安全**：可指定请求结果的数据类型，提升 TypeScript 支持
- **定制化**：可为不同数据类型或业务场景创建多个请求组件
- **封装**：可封装特定逻辑或默认参数，满足业务需求

### 示例

<demo src="useRequest/demo.vue"
  language="vue"
  title=""
  desc="默认发送获取请求"> </demo>

```ts
import { createUseRequestComponent } from 'vue-hooks-plus'

// 创建带类型的请求组件
const UseRequestUserName = createUseRequestComponent<string>()
```

在模板中用法与 `<use-request />` 完全一致：

```vue
<use-request-user-name
  :service="fetchUserName"
  :refreshDeps="[userId]"
>
  <template #default="{ data, loading, error, refresh }">
    <div v-if="loading">加载中...</div>
    <div v-else-if="error">错误：{{ error.message }}</div>
    <div v-else>用户名：{{ data }}</div>
    <button @click="refresh">刷新</button>
  </template>
</use-request-user-name>
```

### API 一致性

通过 `createUseRequestComponent` 创建的组件，其 API、props 和插槽参数与 `useRequest` hook 及内置 `<use-request />` 组件完全一致。

### 适用场景

- 需要带特定数据类型的请求组件
- 需要为某些业务场景封装默认参数或逻辑
- 需要提升类型推断和代码补全体验

