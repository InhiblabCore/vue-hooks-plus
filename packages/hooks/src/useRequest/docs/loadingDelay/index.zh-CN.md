---
map:
  # 映射到docs的路径
  path: /useRequest/loadingDelay/
source:
  path: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/plugins/useLoadingDelayPlugin.ts
  demoPath: https://github.com/InhiblabCore/vue-hooks-plus/blob/master/packages/hooks/src/useRequest/docs/loadingDelay/demo/demo.vue
---

# Loading Delay

通过设置 `options.loadingDelay` ，可以延迟 `loading` 变成 `true` 的时间，有效防止闪烁。

## 代码演示

### 基本用法

如果你快速的点击 run, 没使用 loadingDelay 的数据将会闪烁。

<demo src="./demo/demo.vue"
  language="vue"
  title=""
  desc="防止闪烁"> </demo>

## API

| 参数         | 说明                                  | 类型                      | 默认值 |
| ------------ | ------------------------------------- | ------------------------- | ------ |
| loadingDelay | 设置 `loading` 变成 `true` 的延迟时间 | `number` \| `Ref<number>` | `0`    |

## 备注

`options.loadingDelay` 支持动态变化。
