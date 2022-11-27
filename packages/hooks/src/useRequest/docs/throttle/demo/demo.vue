<template>
  <div style="margin-top: 16px;"><input type="text" v-model="text"></div>
  <div style="margin-top: 16px;">读取值：{{ data }}</div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  import { useRequest, useTimeout } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    console.log('发送请求')

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${String(Date.now())}`)
      }, 1000)
    })
  }

  const text = ref('')

  const throttleWait = ref(500)

  useTimeout(() => {
    throttleWait.value = 3000
  }, 2000)

  const { data, run } = useRequest(() => getUsername(), {
    throttleWait,
    manual: true,
  })

  watch(text, () => {
    run()
  })
</script>

<style scoped lang="less"></style>
