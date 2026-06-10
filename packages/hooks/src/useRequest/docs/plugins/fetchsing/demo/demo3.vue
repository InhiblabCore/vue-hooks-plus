<template>
  <h3>demo3</h3>
  <div>{{ loading ? 'loading...' : data }}</div>
  <br />
  <div>{{ isFetching ? 'complete!' : 'all loading...' }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'
  import { useFetchingPlugin } from '@vue-hooks-plus/use-request-plugins'
  import { ref } from 'vue'
  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`vue-hooks-plus ${params.desc}`)
      }, 3000)
    })
  }

  const isFetching = ref(false)
  const { data, loading } = useRequest(
    () => getUsername({ desc: 'good' }),
    {
      pluginOptions: {
        fetchingKey: () => {
          return 'three'
        },
        onFetching: (current: any, record: any) => {
          console.log(current)
          console.log(record)
        },
        isFetching: (v: boolean) => {
          isFetching.value = v
        },
      },
    },
    [useFetchingPlugin],
  )
</script>

<style scoped lang="less"></style>
