<script setup lang="ts">
  import { coreTeamMembers } from '../../../contributors'
  import TeamMember from './TeamMember.vue'
</script>

<template>
  <div class="container">
    <div class="main">
      <div>
        <h2 class="name">
          Meet The Team
        </h2>
      </div>
      <div class="grid">
        <TeamMember v-for="c of coreTeamMembers" :key="c.github" :data="c" />
      </div>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    text-align: center;
    font-weight: 600;
    /* transform: scale(0.8); */
    color: var(--vp-font-color);
    padding-bottom: 1rem;
    padding-top: 2rem;
  }

  .main {
    /* padding: 96px 32px; */
    text-align: center;
    background-color: var(--vp-c-bg);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
    /* border: 1.5px solid rgba(0, 0, 0, 0.05); */
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 30px 1px rgba(0, 0, 0, 0.15);
  }

  .grid {
    display: grid;
    grid-row-gap: 0.45rem;
    grid-column-gap: 3rem;
    grid-template-columns: repeat(3, 1fr);
    padding-left: 124px;
    padding-right: 124px;
    padding-bottom: 32px;
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
    .container {
      padding-bottom: 32px;
    }
  }
</style>
