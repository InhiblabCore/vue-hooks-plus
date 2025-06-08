# 组件 Hook 指南

组件 Hook 是一种高级自定义 Hook，既封装了逻辑，也封装了 UI，使得在 Vue 中复用复杂行为和布局变得简单。在 vue-hooks-plus 中，你可以使用 `createUseRequestComponent` 快速生成用于数据请求等场景的组件化 Hook。

## 什么是组件 Hook？

组件 Hook 是一个返回 Vue 组件的函数或工厂，该组件内部会使用 Hook（如 `useRequest`）来管理逻辑和状态。这样不仅可以复用逻辑，还能复用 UI 和插槽，提升应用开发效率。

## 示例：useRequest 组件

假设你希望以可复用的方式获取数据，并展示加载、错误和数据状态。你可以用 `createUseRequestComponent` 生成一个组件 Hook。

### 步骤 1：创建组件 Hook

```ts
import { createUseRequestComponent } from 'vue-hooks-plus'

const UseRequestUserName = createUseRequestComponent<string>()
```

### 步骤 2：在模板中使用组件 Hook

```vue
<use-request-user-name
  :service="() => getUsername({ desc })"
  :refreshDeps="[desc]"
>
  <template #default="{ data, refresh, loading }">
    <div>name: {{ data }}</div>
    <vhp-button v-if="!loading.value" @click="refresh()">refresh</vhp-button>
  </template>
  <template #loading>
    <div>loading</div>
  </template>
  <template #error>
    <div>error</div>
  </template>
</use-request-user-name>
```

### 步骤 3：提供服务函数

```ts
function getUsername(params: { desc: string }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`vue-hooks-plus ${params.desc}`)
    }, 1000)
  })
}
```

### 步骤 4：在脚本中使用

```ts
import { ref } from 'vue'

const desc = ref('good')
```

## 工作原理

- 组件 Hook（如 `UseRequestUserName`）内部管理请求逻辑。
- 你只需传递 `service` 属性（返回 Promise 的函数）和依赖项。
- 通过插槽（`default`、`loading`、`error`）自定义各状态下的 UI。
- 插槽参数提供 `data`、`refresh`、`loading` 等，方便灵活控制。

## 优势

- **关注点分离**：逻辑和 UI 封装，便于复用。
- **UI 可定制**：通过插槽自定义各状态的渲染。
- **类型安全**：TypeScript 支持数据和插槽参数类型。

## 最佳实践

- 总是为你的组件 Hook 及其插槽参数编写文档。
- 使用有意义的组件 Hook 命名（如 `UseRequestUserName`）。
- 利用 TypeScript 泛型提升类型推断。

## 总结

组件 Hook 是构建可复用、易维护和可扩展 Vue 应用的强大模式。通过 `createUseRequestComponent`，你可以快速创建具备可定制 UI 和共享逻辑的数据驱动组件。

## 进阶用法

### 自定义插槽参数

你可以定义和文档化组件 Hook 提供的插槽参数。例如，暴露更多控制方法或状态：

```ts
const UseRequestUserName = createUseRequestComponent<string, { desc: string }>()
```

在插槽中即可访问所有暴露的属性：

```vue
<template #default="{ data, refresh, loading, error }">
  <!-- 自定义渲染逻辑 -->
</template>
```

### 传递额外属性

组件 Hook 可接收并向内部逻辑或 UI 传递额外属性。例如添加分页、筛选等：

```vue
<use-request-user-name
  :service="..."
  :refreshDeps="..."
  :page="page"
  :pageSize="pageSize"
>
  <!-- ... -->
</use-request-user-name>
```

### 组合多个 Hook

你可以在组件 Hook 内部组合多个 Hook，封装更复杂的逻辑：

```ts
function useComplexFeature() {
  const { data, loading } = useRequest(...)
  const { state, toggle } = useToggle()
  // 按需组合返回
  return { data, loading, state, toggle }
}
```

## 常见场景

- **数据请求及加载/错误状态处理**
- **可复用的弹窗、对话框、气泡卡片**
- **表单逻辑封装**
- **功能开关或权限校验**
- **无限滚动或分页**

## 小贴士与注意事项

- **命名**：为组件 Hook 及插槽使用清晰、描述性的名称。
- **类型安全**：始终使用 TypeScript 泛型，提升类型推断和 IDE 体验。
- **性能**：合理管理依赖，避免不必要的重新渲染。
- **文档**：为每个组件 Hook 编写属性、插槽参数和用法示例文档。

## 常见问题

**Q: 可以在 Options API 中使用组件 Hook 吗？**  
A: 组件 Hook 主要为 Composition API 和 `<script setup>` 设计。Options API 可将组件 Hook 包装为独立组件使用。

**Q: 如何测试组件 Hook？**  
A: 可分别测试逻辑（Hook）和 UI（挂载生成的组件）。

**Q: 可以嵌套组件 Hook 吗？**  
A: 可以，根据复杂场景自由组合和嵌套组件 Hook。
