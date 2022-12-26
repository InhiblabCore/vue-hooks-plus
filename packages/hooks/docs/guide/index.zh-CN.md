<script setup>
import Badge from '@theme/home/Badge.vue'
import Icon from '@theme/home/Icon.vue'
</script>

<Icon />
<h1 style="text-align:center">VueHooks Plus</h1>
<br />
<Badge />

## ✨ 特性

- 🏄🏼‍♂️ 易学易用
- 🔋 支持 SSR
- 🛸 丰富的 Hooks
- 🏟️ 覆盖大部分业务场景
- 🦾 首选 useRequest，强大的请求中间层
- 🎪 交互式 demo，身临其境
- 🎯 使用 TypeScript 构建，提供完整的类型定义文件
- 🪄 支持按需加载，减少打包体积
- 🤺 演练场，大有用武之地
- 🔐 测试完善，安全可靠

## 📦 安装

```bash
npm i vue-hooks-plus
```

## 🔨 使用

### 全量引入

```typescript
import { useRequest } from 'vue-hooks-plus'
```

### 按需引入

```typescript
import useRequest from 'vue-hooks-plus/es/useRequest'
```

<br />

::: warning 不兼容 vue2 版本 :::
