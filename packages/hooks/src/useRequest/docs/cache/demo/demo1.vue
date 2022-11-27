<template>
  <div>
    <vhp-button @click="() => toggle()">show/hidden</vhp-button>
    <div v-if="state" style="padding: 16px;">
      <p>{{ data }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRequest, useToggle } from 'vue-hooks-plus'

  const [state, { toggle }] = useToggle()

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(String(Date.now()))
      }, 1000)
    })
  }

  const { data } = useRequest(() => getUsername(), {
    ready: state,
    cacheKey: 'staleTime-demo',
    staleTime: 50000,
  })
</script>
