---
map:
  # 映射到docs的路径
  path: /useWorker
---

# useWorker

`useWorker` is a js library (with typescript support) that allows you to use the [Web Worker Web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), through Vue Hook. This library allows you to run the expensive function without blocking the user interface, using a simple syntax that makes use of [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?retiredLocale=it)

## Install

```bash

npm i @vue-hooks-plus/use-worker

```

## Code demonstration

<demo src="./demo/demo.vue"
  language="vue"
  title="basic usage"
  desc="Normal sorting will block UI bleeding, while worker sorting will not"> </demo>
