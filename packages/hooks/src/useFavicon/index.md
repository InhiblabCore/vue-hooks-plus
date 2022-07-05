---
map:
  # 映射到docs的路径
  path: /useFavicon
---

# useFavicon

设置页面的 favicon。

## 代码演示

### 基本用法

<demo src="./demo/demo.vue"
  language="vue"
  title="动态改变 favicon。"
  desc="">
</demo>

## API

```typescript
useFavicon(href: string);
```

### Params

| 参数 | 说明                                                  | 类型     | 默认值 |
| ---- | ----------------------------------------------------- | -------- | ------ |
| href | favicon 地址, 支持 `svg`/`png`/`ico`/`gif` 后缀的图片 | `Ref<string>` | -      |
