<template>
  <div style="margin-top: 16px;"><input type="text" v-model="text"></div>
  <div style="margin-top: 16px;">value：{{ data }}</div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'

  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${String(Date.now())}`)
      }, 300)
    })
  }

  const text = ref('')

  const { data, run } = useRequest(() => getUsername(), {
    debounceWait: 1000,
    manual: true,
  })

  watch(text, c => {
    run()
  })
</script>
