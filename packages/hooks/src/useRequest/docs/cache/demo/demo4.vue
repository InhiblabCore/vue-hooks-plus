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
        resolve(String(Date.now()) + 'useRequest')
      }, 1000)
    })
  }

  const cacheKey = 'setCache-demo'
  const { data } = useRequest(() => getUsername(), {
    ready: state,
    cacheKey,
    staleTime: 5000,

    setCache: res => {
      localStorage.setItem(cacheKey, JSON.stringify(res.data))
    },
    getCache: () => {
      return JSON.parse(localStorage.getItem(cacheKey) ?? '{}')
    },
  })
</script>
