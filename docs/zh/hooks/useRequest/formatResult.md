---
map:
  # 映射到docs的路径
  path: /useRequest/formatResult/
source:
  showSource: false
---

# 格式化请求数据

## v1 use

由于 v1 版本 `useRequest` 需要保证良好的插件系统，format 对于系统来说侵入性太大，这里格式化使用的的是 `useFormatResult`,在请求数据完成后将 data 传入 `useFormatResult` 进行格式化， `useFormatResult` 可以很好的支持 `typescript` 类型提示。 <br />

<a href="/docs/hooks/useFormatResult/" >跳转至 useFormatResult</a>

## v2 use

它现在能够很好的支持 ts 类型。

<demo src="request-formatResult/demo.vue"
     language="vue"
     title=""
     desc="格式化请求数据"> </demo>

## Options

| 参数         | 说明           | 类型                              | 默认值 |
| ------------ | -------------- | --------------------------------- | ------ |
| formatResult | 格式化请求结果 | `(response: TData) => FormatData` | -      |
