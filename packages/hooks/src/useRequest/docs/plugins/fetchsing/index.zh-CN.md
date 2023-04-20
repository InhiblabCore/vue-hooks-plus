---
map:
  # 映射到docs的路径
  path: /useRequest/plugins/fetchsing
source:
  show: false
---

# useRequest Fetching 插件

基于 `pinia` 实现的全局请求状态管理的插件。useRequest Fetching 插件会在内部创建一个 `pinia`的状态管理实例，收集请求的信息。

## 功能

- 充当所有请求的状态中间态，用户可以在中间态中对收集的请求结果进行操作。
- 是否所有请求都完成，自动收集判断所有请求是否完成。
- 无侵入性，所有配置均由插件注入，对当前函数无侵入性。

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="多个组件，当所有请求完成后显示加载完成"> </demo>
