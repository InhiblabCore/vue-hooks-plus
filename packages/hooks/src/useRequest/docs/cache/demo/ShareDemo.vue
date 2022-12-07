<template>
  <vhp-button @click="() => refresh()"> request again </vhp-button>
  <div>{{ `loading：${loading}` }}</div>
  <div>{{ data }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(String(Date.now()))
      }, 1000)
    })
  }

  const { data, loading, refresh } = useRequest(() => getUsername(), {
    cacheKey: 'cacheKey-share',
  })
</script>
