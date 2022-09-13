---
map:
  # 映射到docs的路径
  path: /useInfiniteScroll
---

# useInfiniteScroll

useInfiniteScroll 封装了常见的无限滚动逻辑。


```ts
const { data, loading, loadingMore, loadMore } = useInfiniteScroll(service);
```

useInfiniteScroll 的第一个参数 `service` 是一个异步函数，对这个函数的入参和出参有如下约定：

1. `service` 返回的数据必须包含 `list` 数组，类型为 `{ list: any[], ...rest }`
2. `service` 的入参为整合后的最新 `data`

假如第一次请求返回数据为 `{ list: [1, 2, 3], nextId: 4 }`, 第二次返回的数据为 `{ list: [4, 5, 6], nextId: 7 }`, 则我们会自动合并 `list`，整合后的的 `data` 为 `{ list: [1, 2, 3, 4, 5, 6], nextId: 7 }`。

## 基础用法

第一个例子我们演示最基本的无限滚动写法。

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="">
</demo>

## 分页

在数据固定场景下，我们有时候会用 `page` 和 `pageSize` 来请求新的分页数据。

<demo src="./demo/demo1.vue"
  language="vue"
  title="分页"
  desc="">
</demo>

## 滚动自动加载

在无限滚动场景中，我们最常见的是滚动到底部时自动加载。通过配置以下几个属性，即可实现滚动自动加载。

- `options.target` 指定父级元素（父级元素需设置固定高度，且支持内部滚动）
- `options.isNoMore` 判断是不是没有更多数据了

<demo src="./demo/demo2.vue"
  language="vue"
  title="滚动自动加载"
  desc="">
</demo>

## 数据重置

通过 `reload` 即可实现数据重置，重置数据到第一页。

<demo src="./demo/demo3.vue"
  language="vue"
  title="reload 数据重置"
  desc="">
</demo>

以上代码可以通过 `reloadDeps` 语法糖实现，当 `reloadDeps` 变化时，会自动触发 `reload`。


## 数据突变

通过 `mutate`，我们可以直接修改当前 `data`。下面示例演示了删除某条数据。

<demo src="./demo/demo4.vue"
  language="vue"
  title="mutate 数据突变"
  desc="">
</demo>
