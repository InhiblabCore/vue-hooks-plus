---
map:
  # 映射到docs的路径
  path: /useExternal
---

# useExternal

动态注入 JS 或 CSS 资源，useExternal 可以保证资源全局唯一。

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="动态加载js"
  desc="加载 js 文件,引入 axios"> </demo>

### 加载 CSS

<demo src="./demo/demo1.vue"
  language="vue"
  title="动态加载样式"
  desc="加载 css 文件"> </demo>

## API

```typescript
const status = useExternal(path: string, options?: Options);
```

## Params

| 参数 | 说明              | 类型     | 默认值 |
| ---- | ----------------- | -------- | ------ |
| path | 外部资源 url 地址 | `string` | -      |

## Result

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| status | 加载状态，`unset`(未设置), `loading`(加载中), `ready`(加载完成), `error`(加载失败) | `Ref<string>` |

## Options

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| type | 需引入外部资源的类型，支持 `js`/`css`，如果不传，则根据 path 推导 | `string` | - |
| js | `script` 标签支持的属性 | `HTMLScriptElement` | - |
| css | `link` 标签支持的属性 | `HTMLStyleElement` | - |
