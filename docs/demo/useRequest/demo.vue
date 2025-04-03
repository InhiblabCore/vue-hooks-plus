<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`vue-hooks-plus ${params.desc}`)
      }, 1000)
    })
  }

  const { data, loading } = useRequest(() => getUsername({ desc: 'good' }), {
    debugKey: 'demo',
    initialData:"000"
  })
</script>
