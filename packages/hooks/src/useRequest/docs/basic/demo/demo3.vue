<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <div>
    <input v-model="value">
    <vhp-button style="margin-left: 8px;" @click="run({ desc: value })">Edit</vhp-button>
  </div>
  <div>
    <p v-for="msg in step" :key="msg">{{ msg }}</p>
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
  const value = ref('')
  const step = ref<string[]>([])
  const { data: data, loading, run } = useRequest(getUsername, {
    manual: true,
    onBefore: () => {
      step.value = []
      step.value.push('start request')
    },
    onSuccess: () => {
      step.value.push('start request success')
    },
    onError: () => {
      step.value.push('start request error')
    },
    onFinally: () => {
      step.value.push('start request finally')
    },
  })
</script>
