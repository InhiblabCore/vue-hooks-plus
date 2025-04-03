# 🫶 迁移到 v2 版本

:::info

- useRequest plugin option

:::

## 1、useRequest plugin option

v2 版本的 useRequest 插件系统为了有良好的类型提示以及后续拓展，我们重新设计了 plugin option 的使用方式，你只需要进行简单的改变即可达到迁移。

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

只需要在原来的 plugin option 的基础上，将其迁移到 `pluginOptions` 下即可。
