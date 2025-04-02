<template>
  <div>Origin name: {{ loading ? 'loading' : data }}</div>
  <div>Format: {{ loading1 ? 'loading' : JSON.stringify(formatData) }}</div>
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

  const { data, loading } = useRequest(() => getUsername({ desc: 'good' }))

  const { data: formatData, loading: loading1 } = useRequest(() => getUsername({ desc: 'good' }), {
    formatResult(res) {
      return {
        name: `formatter ${res}`,
        age: 18,
      }
    },
  })
</script>
