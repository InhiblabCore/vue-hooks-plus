---
map:
  # 映射到docs的路径
  path: /useRequest/devtools/
source:
  show: false
---

# 开发者工具

`useRequest` 提供了一个 `debugKey` 参数，并且在 `dev` 模式下会开启 `devtools`。

欢呼雀跃，因为 useRequest 带有专用的开发工具！😍

当你开始使用 useRequest 时，你会想要这个开发工具在你身边。它们可以帮助可视化 useRequest 的内部工作，并且如果你在紧急情况下发现自己需要调试，它们很可能会节省你数小时的时间！

你需要做的唯一一件事是安装官方的 [Vue Devtools](https://devtools.vuejs.org/guide/installation.html)。

useRequest devtools 会与官方的开发工具整合，添加自定义的检查器和时间轴事件。Devtools would be treeshaken from production bundles by default.

目前处于`测试阶段`, 你可以下载 `1.7.7`及更高版本使用。

## 导入 Devtools

`main.ts`

```typescript
import { useRequestDevToolsPlugin } from 'vue-hooks-plus'

app.use(useRequestDevToolsPlugin)
```

## 在 `.vue` 中使用

使用 `debugKey` 创建唯一标识开启。

```typescript
const { data, loading } = useRequest(() => getUsername({ desc: 'good' }), { debugKey: 'demo' })
```

大功告成！打开浏览器 Vue 插件进行使用吧 🍺

![Alt](/plugin.png 'plugin devtool image')
