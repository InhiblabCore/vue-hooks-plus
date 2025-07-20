---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'Vue hooks plus'
  text: 'High-performance Hooks Library for Vue'
  tagline: Your favorite vuejs library 🧲
  actions:
    - theme: brand
      text: Quick Start
      link: /guide/introduction
  image:
    src: /logo.svg
    alt: Vue Hooks Plus

features:
  - title: 🛸 Hooks for vue3
    details: Contains a comprehensive collection of basic Hooks.
  - title: 🏄🏼‍♂️ Easy to learn and use
    details: Simple language and easy-to-use features, easy to use, detailed documentation.
  - title: 🎯 TypeScript
    details: Written in TypeScript with predictable static types.
  - title: 🎪 Interactive demo
    details: Interactive demo, immersive.
  - title: 🔋 Support SSR
    details: Friendly support for server-side rendering.
  - title: 🦾 useRequest
    details: Preferred useRequest, Powerful request middle tier.
  - title: 🤺 Playground
    details: Playground, there's ample scope for one's abilities.
  - title: 🪄 Support the on-demand load
    details: Support the on-demand load, and reduce the packing volume.
  - title: 🔐 Safe
    details: Perfect test, safe and reliable.
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers,
  VPTeamPageSection
} from 'vitepress/theme'

import {members} from './contributors'


</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Team</template>
    <template #lead> Vue Hooks Plus is developed and maintained by a     passionate team of Vue enthusiasts.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers size="small" :members="members" />
  <VPTeamPageSection>
    <template #title>Contributors</template>
    <template #members>
      <div style="display: flex; justify-content: center;">
        <a target="__blank" href="https://github.com/InhiblabCore/vue-hooks-plus/graphs/contributors">
           <img src="https://contrib.rocks/image?repo=InhiblabCore/vue-hooks-plus" />
        </a>
      </div>
    </template>
  </VPTeamPageSection>
</VPTeamPage>
