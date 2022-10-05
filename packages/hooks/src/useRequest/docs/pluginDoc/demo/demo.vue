<template>
  <div>{{ data?.name ?? '-' }}</div>
  <div>{{ data?.age ?? '-' }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  import { Plugin } from '../../../types'

  const useFormatterPlugin: Plugin<
    {
      name: string
      age: number
    },
    [],
    {
      formatter?: ({ name, age }?: { name: string; age: number }) => any
    }
  > = (fetchInstance, { formatter }) => {
    return {
      onSuccess: () => {
        fetchInstance.setData(formatter?.(fetchInstance.state.data), 'data')
      },
    }
  }

  function getUsername(): Promise<{ name: string; age: number }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          name: 'vue-hooks-plus',
          age: 18,
        })
      }, 1000)
    })
  }

  const { data } = useRequest(
    () => getUsername(),
    {
      formatter: (data: any) => {
        return {
          name: `${data.name} - plugins update`,
          age: 20,
        }
      },
    },
    [useFormatterPlugin],
  )
</script>

<style scoped lang="less"></style>
