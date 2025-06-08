# useRequest

The `useRequest` component is a high-level abstraction based on the `useRequest` hook, allowing you to use all the powerful features of `useRequest` in a declarative, component-based way.

## Component Usage `2.4.0-beta`

You can use the `useRequest` component to handle data fetching, loading, error, and success states directly in your template. The API and props of the component are fully consistent with the `useRequest` hook, making it easy to switch between the two approaches.

### Basic Example

<demo src="useRequest/demo.vue"
  language="vue"
  title=""
  desc="默认发送获取请求"> </demo>

```vue
<use-request
  :service="fetchData"
  :refreshDeps="[someDep]"
  :initialData="'default'"
>
  <template #default="{ data, loading, error, refresh }">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>Data: {{ data }}</div>
    <button @click="refresh">Refresh</button>
  </template>
</use-request>
```

### API

The `useRequest` component accepts all the same props as the `useRequest` hook options:

- `service`: Function returning a Promise (required)
- `refreshDeps`: Array of dependencies to trigger refresh
- `initialData`: Initial data value
- `manual`: Whether to trigger manually
- `onSuccess`, `onError`, `onFinally`: Lifecycle callbacks
- ...and all other options supported by the `useRequest` hook

#### Slots

- `default`: Slot props include `{ data, loading, error, refresh, ... }`, matching the return values of the `useRequest` hook.
- `loading`: Custom loading UI
- `error`: Custom error UI

### Consistency with useRequest Hook

All features, options, and return values of the `useRequest` component are consistent with the `useRequest` hook. You can refer to the useRequest hook documentation for detailed API descriptions and advanced usage.

## When to Use

- When you prefer a declarative, template-based approach for data fetching
- When you want to leverage slots for flexible UI customization
- When you need to keep logic and UI closely coupled in your component templates

## Using `createUseRequestComponent`

In addition to the built-in `<use-request />` component, you can use the `createUseRequestComponent` utility to generate your own request components with custom types or behaviors.

### Why use `createUseRequestComponent`?

- **Type Safety**: You can specify the data type for the request result, improving TypeScript support.
- **Customization**: You can create multiple request components for different data types or business scenarios.
- **Encapsulation**: Encapsulate specific logic or default options for your business needs.

### Example

```ts
import { createUseRequestComponent } from 'vue-hooks-plus'

// Create a typed request component
const UseRequestUserName = createUseRequestComponent<string>()
```

You can then use this component in your template just like `<use-request />`:

```vue
<use-request-user-name
  :service="fetchUserName"
  :refreshDeps="[userId]"
>
  <template #default="{ data, loading, error, refresh }">
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>User Name: {{ data }}</div>
    <button @click="refresh">Refresh</button>
  </template>
</use-request-user-name>
```

### API Consistency

The API, props, and slot props of the component created by `createUseRequestComponent` are fully consistent with the `useRequest` hook and the built-in `<use-request />` component.

### When to Use

- When you need a request component with specific data types.
- When you want to encapsulate default options or logic for a certain business scenario.
- When you want to improve type inference and code completion in your project.
