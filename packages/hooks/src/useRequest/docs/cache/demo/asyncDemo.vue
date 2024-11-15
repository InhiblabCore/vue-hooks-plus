<template>
  <div>
    <vhp-button @click="() => toggle()">show/hidden</vhp-button>
    <div v-if="state" style="padding: 16px;">
      <p>{{ data ?? cacheData }}</p>
      <div> cacheData: {{ cacheData }} </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRequest, useToggle } from 'vue-hooks-plus'
  const cacheKey = 'cacheKey-async-storage'

  const asyncStorage = {
    setItem: (key: string, value: any) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          localStorage.setItem(key, value)
          resolve(value)
        }, 200)
      })
    },
    getItem: (key: string) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(localStorage.getItem(key))
        }, 100)
      })
    },
  }

  const [state, { toggle }] = useToggle()

  const { data: cacheData, refresh } = useRequest(
    () => asyncStorage.getItem(cacheKey) as Promise<string>,
    {
      cacheKey,
      debugKey: cacheKey,
    },
  )

  function getUsername(refresh: VoidFunction): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        asyncStorage.setItem(cacheKey, String(Date.now())).then(() => {
          refresh()
        })
        resolve(String(Date.now()))
      }, 1000)
    })
  }

  const { data } = useRequest(() => getUsername(refresh), {
    ready: state,
    cacheKey: 'cacheKey-get-username',
  })
</script>
