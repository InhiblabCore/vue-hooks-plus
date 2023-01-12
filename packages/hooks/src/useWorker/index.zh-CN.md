---
map:
  # 映射到docs的路径
  path: /useWorker
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/use-worker/src/index.ts
---

# useWorker

`useWorker` 允许您通过 Vue Hook 使用 [Web Worker Web API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers)。该库允许您使用使用 [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise?retiredLocale=it) 的简单语法来运行昂贵的函数而不会阻塞用户界面

## 安装

```bash

npm i @vue-hooks-plus/use-worker

```

## 代码演示

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="正常排序会阻塞UI渲染，而worker排序则不会"> </demo>
