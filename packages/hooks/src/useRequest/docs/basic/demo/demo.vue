<template>
  <div>读取名称：{{ data }}</div>
  <div>读取名称1：{{ data1 }}</div>
  <br>
  <div>参数固定的情况下，是无法获取params的值{{ JSON.stringify(params) }}</div>
  <div>手动请求的时候{{ JSON.stringify(params1) }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`vue-hooks-plus ${params.desc}`)
      }, 1000)
    })
  }

  const { data, params } = useRequest(() => getUsername({ desc: '牛' }))

  const { data: data1, params: params1, run } = useRequest(getUsername, { manual: true })

  run({ desc: '小牛' })
</script>

<style scoped lang="less"></style>
