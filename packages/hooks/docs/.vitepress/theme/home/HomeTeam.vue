<script setup lang="ts">
  import { coreTeamMembers } from '../../../contributors'
  import TeamMember from './TeamMember.vue'
</script>

<template>
  <div>
    <h2 class="name">
      Meet The Team
    </h2>
  </div>
  <div class="main">
    <div class="grid">
      <TeamMember v-for="c of coreTeamMembers" :key="c.github" :data="c" />
    </div>
  </div>
</template>

<style scoped>
  .container {
    display: flex;
  }

  h2 {
    text-align: center;
    font-weight: 600;
    /* transform: scale(0.8); */
    color: var(--vp-font-color);
    padding-bottom: 1rem;
  }

  .main {
    /* padding: 96px 32px; */
    text-align: center;
    background-color: var(--vp-c-bg);
  }

  .grid {
    display: grid;
    grid-row-gap: 0.45rem;
    grid-column-gap: 3rem;
    grid-template-columns: repeat(4, 1fr);
    padding-left: 184px;
    padding-right: 184px;
  }

  .grid div {
    padding: 42px 32px;
  }

  @media (max-width: 1450px) {
    .grid {
      display: grid;
      grid-row-gap: 0.45rem;
      grid-column-gap: 3rem;
      grid-template-columns: repeat(3, 1fr);
      padding-left: 124px;
      padding-right: 124px;
    }

    .grid div {
      padding: 42px 32px;
    }
  }
  @media (max-width: 1100px) {
    .grid {
      display: grid;
      grid-row-gap: 0.45rem;
      grid-column-gap: 3rem;
      grid-template-columns: repeat(2, 1fr);
      padding-left: 64px;
      padding-right: 64px;
    }

    .grid div {
      padding: 42px 32px;
    }
  }
  @media (max-width: 768px) {
    .grid {
      display: grid;
      grid-row-gap: 24px;
      grid-column-gap: 3rem;
      grid-template-columns: repeat(1, 1fr);
    }

    .grid div {
      padding: 12px 12px;
    }
  }
  @media (max-width: 370px) {
    .tagline {
      font-size: 36px;
    }
  }
</style>
