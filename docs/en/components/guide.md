# Component Hook Guide

Component hooks are advanced custom hooks that encapsulate both logic and UI, making it easy to reuse complex behaviors and layouts in Vue. In vue-hooks-plus, you can use `createUseRequestComponent` to quickly generate a componentized hook for data fetching and more.

## What is a Component Hook?

A component hook is a function or factory that returns a Vue component, which internally uses a hook (like `useRequest`) to manage logic and state. This allows you to reuse not only the logic, but also the UI and slots, across your application.

## Example: useRequest Component

Suppose you want to fetch data and display loading, error, and data states in a reusable way. You can use `createUseRequestComponent` to generate a component hook.

### Step 1: Create the Component Hook

```ts
import { createUseRequestComponent } from 'vue-hooks-plus'

const UseRequestUserName = createUseRequestComponent<string>()
```

### Step 2: Use the Component Hook in Your Template

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

### Step 3: Provide the Service Function

```ts
function getUsername(params: { desc: string }): Promise<string> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(`vue-hooks-plus ${params.desc}`)
    }, 1000)
  })
}
```

### Step 4: Use in Your Script

```ts
import { ref } from 'vue'

const desc = ref('good')
```

## How It Works

- The component hook (`UseRequestUserName`) manages the request logic internally.
- You pass a `service` prop (a function returning a Promise) and any dependencies.
- You can use slots (`default`, `loading`, `error`) to customize the UI for each state.
- The slot props provide `data`, `refresh`, and `loading` for full control.

## Benefits

- **Separation of concerns**: Logic and UI are encapsulated and reusable.
- **Customizable UI**: Use slots to define how each state is rendered.
- **Type safety**: TypeScript support for data and slot props.

## Best Practices

- Always document the expected props and slot props for your component hook.
- Use meaningful names for your component hooks (e.g., `UseRequestUserName`).
- Leverage TypeScript generics for better type inference.

## Conclusion

Component hooks are a powerful pattern for building reusable, maintainable, and scalable Vue applications. With `createUseRequestComponent`, you can quickly create data-driven components with customizable UI and shared logic.

## Advanced Usage

### Customizing Slot Props

You can define and document the slot props your component hook provides. For example, you might want to expose more control methods or state:

```ts
const UseRequestUserName = createUseRequestComponent<string, { desc: string }>()
```

In your slot, you can access all exposed properties:

```vue
<template #default="{ data, refresh, loading, error }">
  <!-- Custom rendering logic -->
</template>
```

### Passing Additional Props

Component hooks can accept and forward additional props to the internal logic or UI. For example, you can add pagination, filters, or other options:

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

### Composing Multiple Hooks

You can compose multiple hooks inside a component hook to encapsulate more complex logic:

```ts
function useComplexFeature() {
  const { data, loading } = useRequest(...)
  const { state, toggle } = useToggle()
  // Combine and return as needed
  return { data, loading, state, toggle }
}
```

## Common Scenarios

- **Data fetching with loading/error states**
- **Reusable modals, dialogs, or popovers**
- **Form logic encapsulation**
- **Feature toggles or permission checks**
- **Infinite scroll or pagination**

## Tips & Caveats

- **Naming**: Use clear, descriptive names for your component hooks and their slots.
- **Type Safety**: Always use TypeScript generics for better type inference and IDE support.
- **Performance**: Avoid unnecessary re-renders by managing dependencies carefully.
- **Documentation**: Document the expected props, slot props, and usage examples for each component hook.

## FAQ

**Q: Can I use component hooks in Options API?**  
A: Component hooks are designed for the Composition API and `<script setup>`. For Options API, consider wrapping the component hook as a standalone component.

**Q: How do I test component hooks?**  
A: You can test the logic separately as a hook, and test the UI by mounting the generated component in your test suite.

**Q: Can I nest component hooks?**  
A: Yes, you can compose and nest component hooks as needed for complex scenarios.
