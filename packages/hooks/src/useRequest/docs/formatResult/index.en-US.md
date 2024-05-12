---
map:
  # 映射到docs的路径
  path: /useRequest/formatResult/
source:
  show: false
---

# Format the request result

## v1 use

Since v1 version `useRequest` needs to guarantee a good plug-in system, format is too invasive for the system, the formatting here is `useFormatResult`, format data to `useFormatResult` after the request data is completed, `useFormatResult` can well support `typescript` type prompt. <br />

<a href="/docs/hooks/en/useFormatResult/" >Jump to useFormatResult</a>

## v2 use

It now supports ts types very well.

<demo src="./demo/demo.vue"
     language="vue"
     title=""
     desc="format the request result"> </demo>

## Options

| Property     | Description               | Type                              | Default |
| ------------ | ------------------------- | --------------------------------- | ------- |
| formatResult | format the request result | `(response: TData) => FormatData` | -       |
