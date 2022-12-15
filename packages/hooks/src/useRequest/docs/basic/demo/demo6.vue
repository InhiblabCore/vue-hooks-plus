<template>
  <div>name：{{ loading ? 'loading..' : data }}</div>
  <div>
    <input v-model="value">
    <vhp-button style="margin-left: 8px;" @click="handleClick">Edit</vhp-button>
    <vhp-button style="margin-left: 8px;" @click="handleCancel">Cancel</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRequest } from 'vue-hooks-plus'

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) resolve(`request-${params.desc}`)
        reject('error')
      }, 2000)
    })
  }
  const value = ref('')
  const { data, loading, run, cancel } = useRequest(getUsername, {
    manual: true,
    onError: () => {
      alert('error')
    },
  })

  const handleClick = () => {
    run({ desc: value.value })
  }

  const handleCancel = () => {
    cancel()
  }
</script>
