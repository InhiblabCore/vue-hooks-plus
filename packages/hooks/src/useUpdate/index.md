---
map:
  # 映射到docs的路径
  path: /useUpdate
---

# useUpdate

用于模拟重新渲染页面

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="基本用法"
  desc="通过改变ref的对象，用watch进行监听动态渲染页面">
</demo>

### 刷新页面

<demo src="./demo/demo1.vue"
  language="vue"
  title="基本用法"
  desc="改变hash值刷新页面">
</demo>


## API

```typescript
const update = useUpdate();
```

### 注意
通过改变变量，监听这个变量达到模拟的效果