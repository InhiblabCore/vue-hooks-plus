<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <div>name1：{{ loading ? 'loading' : data1 }}</div>
  <br>
  <div
  >If the parameter is fixed, the value of params cannot be obtained--
    <span>
      {{ JSON.stringify(params) }}
    </span></div
  >
  <div
  >When manually-- <span>{{ JSON.stringify(params1) }}</span></div
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
