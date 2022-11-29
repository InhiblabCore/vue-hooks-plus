<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <div>name1：{{ loading ? 'loading' : data1 }}</div>
  <br>
  <div
  >参数固定的情况下，是无法获取params的值--
    <span>
      {{ JSON.stringify(params) }}
    </span></div
  >
  <div
  >手动请求的时候-- <span>{{ JSON.stringify(params1) }}</span></div
  >
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

  const { data, loading, params } = useRequest(() => getUsername({ desc: 'good' }))

  const { data: data1, params: params1, run } = useRequest(getUsername, { manual: true })

  run({ desc: 'nice' })
</script>
