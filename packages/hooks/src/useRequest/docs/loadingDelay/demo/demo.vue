<template>
  <div>Username：{{ data }}</div>
  <div>Username：{{ loading ? 'loading...' : data1 }}</div>
  <vhp-button @click="run">run</vhp-button>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('vue-hooks-plus useRequest')
      }, 1000)
    })
  }

  function getUsername1(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('vue-hooks-plus useRequest A')
      }, 1000)
    })
  }

  const { data } = useRequest(() => getUsername())
  const { data: data1, loading, run } = useRequest(() => getUsername1(), {
    loadingDelay: 2000,
  })
</script>
