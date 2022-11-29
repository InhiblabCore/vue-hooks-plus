<template>
  <div>
    <div v-for="item in datas" :key="item.key" class="item">
      {{ item.loading ? 'loading' : '' }}
      {{ item.data }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useFetchs } from 'vue-hooks-plus'

  async function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(
        () => {
          resolve(`vue-hooks-plus ${params.desc}`)
        },
        params.desc === '大牛' ? 4000 : 2000,
      )
    })
  }

  const arr = ['牛', '小牛', '中牛', '大牛']

  const { fetchRun, fetchs } = useFetchs(
    getUsername,
    { manual: true },
    {
      fetchKey: params => {
        return params.desc
      },
    },
  )

  arr.forEach(item => {
    fetchRun({ desc: item })
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
