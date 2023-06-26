<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <div style="margin-top:8px">
    <input v-model="value">
    <vhp-button style="margin-left: 8px;" @click="handleClick">Edit</vhp-button>
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
  const { data: data, loading, runAsync } = useRequest(getUsername, {
    manual: true,
    devKey:"demo2",
  })

  const handleClick = async () => {
    try {
      await runAsync({ desc: value.value })
      alert('success')
    } catch (error) {
      alert('error')
    }
  }

  // run({ desc: 'nice' })
</script>
