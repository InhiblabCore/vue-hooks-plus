<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <div style="margin-top:8px">
    <input v-model="value">
    <vhp-button style="margin-left: 8px;" @click="run({ desc: value })">Edit</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) resolve(`vue-hooks-plus ${params.desc}`)
        reject('error')
      }, 1000)
    })
  }
  const value = ref('vue-hooks-plus')
  const { data: data, loading, run } = useRequest(getUsername, {
    manual: true,
    onSuccess: data => {
      alert(data)
    },
    onError: error => {
      alert(error)
    },
  })

  // run({ desc: 'nice' })
</script>
