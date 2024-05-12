<template>
  <div>Username：{{ loading ? 'loading' : data }}</div>
  <div>Username：{{ loading1 ? 'loading...' : data1 }}</div>
  <vhp-button @click="run">run</vhp-button>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`vue-hooks-plus useRequest A ${new Date().getTime()}`)
      }, 1)
    })
  }

  const { data, loading, run: runData } = useRequest(() => getUsername())
  const { data: data1, loading: loading1, run: runData1 } = useRequest(() => getUsername(), {
    loadingDelay: 300,
  })

  const run = () => {
    runData()
    runData1()
  }
</script>
