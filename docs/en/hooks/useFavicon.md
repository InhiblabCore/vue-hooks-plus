---
map:
  # 映射到docs的路径
  path: /useFavicon
---

# useFavicon

A hook that set the favicon of the page.

## Code demonstration

<demo src="useFavicon/demo.vue"
  language="vue"
  title="Basic usage"
  desc="Set favicon"> </demo>

## API

```typescript
useFavicon(href: string);
```

## Params

| Property | Description                                             | Type          | Default |
| -------- | ------------------------------------------------------- | ------------- | ------- |
| href     | favicon URL, support `svg`/`png`/`ico`/`gif` 后缀的图片 | `Ref<string>` | -       |
