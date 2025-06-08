---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "Vue hooks plus"
  text: "高性能的 vue hooks 库"
  tagline: 你喜欢的样子它都有 🧲
  actions:
    - theme: brand
      text: 快速开始
      link: /zh/guide/introduction
    - theme: alt
      text: Hooks 列表  
      link: /zh/hooks/useRequest/quick-start
  
  image:
    src: /logo.svg
    alt: Vue Hooks Plus

features:
  - title: 🛸 Vue3 的 Hooks
    details: 基础和高级的 hook， 高性能逻辑的抽象封装，满足大量场景。 
  - title: 🏄🏼‍♂️ 简洁易用
    details: 简洁的语法和易用的特性，轻松上手，详细的文档。
  - title: 🎯 TypeScript
    details: 使用 TypeScript 构建，提供完整的类型定义文件，安全严谨。
  - title: 🎪 交互式demo演示
    details: 眼见为实，身临其境。
  - title: 🔋 支持 SSR
    details:  服务器端渲染的友好支持。
  - title: 🦾 useRequest
    details: 基于插件模式设计的请求函数。
  - title: 🤺 演练场
    details: 在线编码，大有用武之地。
  - title: 🧩 按需加载
    details: 拿你想要，包体积更小。 
  - title: 🔐 安全性
    details: 测试完善，安全可靠。 
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

import {members} from '../contributors'

</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>团队</template>
    <template #lead>Vue Hooks Plus 由一群热爱 Vue 的开发者开发和维护。</template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="members" />
  <VPTeamPageSection>
    <template #title>贡献者</template>
    <template #members>
      <div style="display: flex; justify-content: center;">
        <a target="__blank" href="https://github.com/InhiblabCore/vue-hooks-plus/graphs/contributors">
           <img src="https://contrib.rocks/image?repo=InhiblabCore/vue-hooks-plus" />
        </a>
      </div>
    </template>
  </VPTeamPageSection>
</VPTeamPage>
