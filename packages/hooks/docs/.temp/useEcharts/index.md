---
map:
  path: /useEcharts
  realPath: src/useEcharts/index.md
---

# useEcharts

优雅的使用 Echarts 的 Hook

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="">
</demo>

## API

```typescript
const { chart, container } = useEcharts()
```

### Result

| 参数    | 说明           | 类型      | 默认值 |
| ------- | -------------- | --------- | ------ |
| chart   | echart实例   | `Ref<echarts.ECharts>`     | -      |
| container | 绑定的容器 | `Element` | null     |



