---
map:
  # 映射到docs的路径
  path: /useLocalStorageState
---

# useLocalStorageState

将状态存储在 localStorage 中的 Hook 。

## 代码演示

### 基础用法

<demo src="./demo/demo.vue"
  language="vue"
  title="将 state 存储在 localStorage 中"
  desc="刷新页面后，可以看到输入框中的内容被从 localStorage 中恢复了。">
</demo>

### 高级用法-存储复杂类型

<demo src="./demo/demo1.vue"
  language="vue"
  title="存储数组或对象等复杂类型"
  desc="会自动进行序列化和反序列化">
</demo>
