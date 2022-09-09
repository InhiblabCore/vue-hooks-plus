<template>
  <div>读取用户名称：{{ data }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('vue-hooks-plus')
      }, 1000)
    })
  }

  const { data } = useRequest(() => getUsername())
</script>

<style scoped lang="less"></style>
