---
map:
  # 映射到docs的路径
  path: /useRequest/
---

# 🚀 useRequest

拥有强大管理网络请求能力，让开发具有飞一般的体验 的 Hook <br /> <br />

`useRequest` 通过插件式组织代码，核心代码简单易懂，并且可以很方便的扩展出更高级的功能。目前已有能力包括：

- 自动请求/手动请求
- 轮询
- 防抖
- 节流
- 屏幕聚焦重新请求
- 错误重试
- loading delay
- SWR(stale-while-revalidate)
- 缓存
- 滚动加载和分页加载
- 并行请求
- 自定义插件

## 默认请求

默认情况下，`useRequest` 第一个参数是一个异步函数，在组件初始化时，会自动执行该异步函数。同时自动管理该异步函数的 `loading` , `data` , `error` 等状态。

```typescript
const { data, error, loading } = useRequest(service)
```

<br />

<demo src="./basic/demo/demo.vue"
  language="vue"
  title=""
  desc="默认发送获取请求"> </demo>
