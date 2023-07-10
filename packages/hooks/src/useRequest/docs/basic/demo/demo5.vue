<template>
  <div>name：{{ data }}</div>
  <div style="margin-top:8px">
    <input v-model="value" />
    <vhp-button style="margin-left: 8px;" @click="handleClick">Edit</vhp-button>
  </div>
  <div style="margin-top:8px">
    <p v-for="msg in step" :key="msg">{{ msg }}</p>
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
  const step = ref<string[]>([])
  const { data: data, run, mutate } = useRequest(getUsername, {
    manual: true,
    devKey: 'demo5',
    rollbackOnError: true,
    onError: () => {
      alert('error')
    },
  })
  const handleClick = () => {
    mutate(value.value)
    run({ desc: value.value })
  }
</script>
