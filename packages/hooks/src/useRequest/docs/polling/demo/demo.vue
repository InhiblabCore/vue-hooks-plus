<template>
  <div
  >读取用户名称：<span>{{ loading ? 'loading' : data }}</span>
    <br>
    <p>轮询间隔：{{ computedTime }}</p>
    <vhp-button @click="start()">开始轮询</vhp-button>
    <vhp-button @click="update()">轮询时间加100</vhp-button>
    <vhp-button @click="cancel()">停止</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(String(Date.now()))
      }, 1000)
    })
  }

  const time = ref(2000)

  const computedTime = computed(() => time.value + 100)

  const { data, run, loading, cancel } = useRequest(() => getUsername(), {
    manual: true,
    pollingInterval: computedTime,
    pollingWhenHidden: false,
  })

  const start = () => {
    run()
  }

  const update = () => {
    time.value += 100
  }
</script>

<style scoped lang="less"></style>
