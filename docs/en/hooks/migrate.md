# 🫶 Migrate to v2 version

:::info

- useRequest plugin option

:::

## 1、useRequest plugin option

In order to have good type hints and subsequent expansion in the v2 version of useRequest plug-in system, we have redesigned the usage of plugin option. You only need to make simple changes to achieve migration.

## v1 use

```typescript
const { data } = useRequest(
  () => serviceFn(),
  {
    ...option,
    ...pluginOption,
  },
  [useFormatterPlugin, ...otherPlugins],
)
```

## v2 use

```typescript
const { data } = useRequest(
  () => serviceFn(),
  {
    ...option,
    pluginOptions: {
      ...pluginOption,
    },
  },
  [useFormatterPlugin, ...otherPlugins],
)
```

Just migrate it to `pluginOptions` based on the original plugin option.
