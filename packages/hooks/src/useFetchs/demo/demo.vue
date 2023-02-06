<template>
  <div>
    <div v-for="item in datas" :key="item.key" class="item">
      {{ item.loading ? 'loading' : '' }}
      {{ item.data }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, watchEffect } from 'vue'
  import { useFetchs } from 'vue-hooks-plus'

  async function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(
        () => {
          resolve(`VueHooks Plus ${params.desc}`)
        },
        params.desc === 'SSS' ? 4000 : 2000,
      )
    })
  }

  const arr = ['A', 'S', 'SS', 'SSS']

  const { fetchRun, fetchs } = useFetchs(
    getUsername,
    { manual: true },
    {
      fetchKey: params => {
        return params.desc
      },
    },
  )

  watchEffect(() => {
    arr.forEach(item => {
      fetchRun({ desc: item })
    })
  })

  const datas = computed(() =>
    Object.keys(fetchs.value ?? {}).map(key => ({
      name: fetchs.value[key].key,
      data: fetchs.value[key].data,
      loading: fetchs.value[key].loading,
      key: fetchs.value[key].key,
    })),
  )
</script>
