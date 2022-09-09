<template>
  <div style="padding: 16px;">
    <div>Status: {{ status }}</div>
    <div class="bd-example">
      <span class="badge badge-pill badge-primary">Primary</span>
      <span class="badge badge-pill badge-secondary">Secondary</span>
      <span class="badge badge-pill badge-success">Success</span>
      <span class="badge badge-pill badge-danger">Danger</span>
      <span class="badge badge-pill badge-warning">Warning</span>
      <span class="badge badge-pill badge-info">Info</span>
      <span class="badge badge-pill badge-light">Light</span>
      <span class="badge badge-pill badge-dark">Dark</span>
    </div>
    <vhp-button
      style="margin-top: 16px;"
      @click="() => (path = 'https://ahooks.js.org/useExternal/bootstrap-badge.css')"
    >
      加载css
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useExternal } from 'vue-hooks-plus'

  const path = ref('')
  const status = useExternal(path)
</script>

<style scoped lang="less"></style>
