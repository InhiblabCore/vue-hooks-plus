<template>
  <div
  >读取用户名称：<span>{{ loading ? 'loading' : data }}</span>
    <br>
    <vhp-button @click="cancel()">停止</vhp-button>
  </div>
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

  const { data, loading, cancel } = useRequest(() => getUsername(), {
    pollingInterval: 3000,
    pollingWhenHidden: false,
  })
</script>

<style scoped lang="less"></style>
