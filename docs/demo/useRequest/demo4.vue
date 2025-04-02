<template>
  <vhp-button style="margin-top: 16px;" @click="() => refresh()">refresh</vhp-button>
  <div style="margin-top: 16px;">{{ loading ? 'loading..' : data }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(String(Date.now()))
      }, 1000)
    })
  }
  const { data, run, loading, refresh } = useRequest(() => getUsername(), {
    manual: true,
    debugKey: 'demo4',
  })
  run()
</script>
