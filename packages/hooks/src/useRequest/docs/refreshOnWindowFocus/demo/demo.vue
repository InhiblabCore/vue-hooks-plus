<template>
  <div style="margin-top: 16px;">读取值：{{ loading ? 'loading' : data }}</div>
  <vhp-button @click="refresh()">刷新</vhp-button>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    console.log('刷新')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${String(Date.now())}`)
      }, 1000)
    })
  }

  const { data, loading, refresh } = useRequest(() => getUsername(), {
    refreshOnWindowFocus: true,
    focusTimespan: 0,
    debounceWait: 500,
  })
</script>
