<template>
  <div>读取用户名称A：{{ data }}</div>
  <div>读取用户名称B：{{ loading ? 'loading...' : data1 }}</div>
</template>

<script lang="ts" setup>
  // import { ref } from 'vue'

  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('vue-hooks-plus useRequest')
      }, 1000)
    })
  }

  function getUsername1(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('vue-hooks-plus useRequest A')
      }, 1000)
    })
  }

  const { data } = useRequest(() => getUsername())
  const { data: data1, loading } = useRequest(() => getUsername1(), {
    loadingDelay: 300,
    // loadingDelay: ref(500),
  })
</script>
