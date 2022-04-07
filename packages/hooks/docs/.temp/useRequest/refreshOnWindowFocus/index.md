---
map:
  path: /useRequest/refreshOnWindowFocus/
  realPath: src/useRequest/doc/debounce/index.md
---

# 依赖刷新

`useRequest` 提供了一个 `options.refreshOnWindowFocus` 参数，在浏览器窗口 `refocus` 和 `revisible` 时，会重新发起请求。

# 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="你可以点击浏览器外部，再点击当前页面来体验效果（或者隐藏当前页面，重新展示），如果和上一次请求间隔大于 5000ms，则会重新请求一次。">
</demo>
