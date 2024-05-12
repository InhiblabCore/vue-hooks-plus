<template>
  <div>{{ loading ? 'loading' : data?.name ?? '-' }}</div>
  <div>{{ loading ? 'loading' : data?.age ?? '-' }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  import { UseRequestPlugin } from '../../../types'

  interface FormatterDataType {
    name: string
    age: number
  }

  interface CustomPluginFieldType {
    formatter: (data: FormatterDataType) => { name: string; age: number }
  }

  const useFormatterPlugin: UseRequestPlugin<
    any,
    [],
    {
      formatter?: CustomPluginFieldType['formatter']
    }
  > = (fetchInstance, { pluginOptions }) => {
    return {
      name: 'formatterPlugin',
      onSuccess: () => {
        fetchInstance.setFetchState(pluginOptions?.formatter?.(fetchInstance.state.data), 'data')
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

  const { data, loading } = useRequest(
    () => getUsername(),
    {
      debugKey: 'plugindemo',
      pluginOptions: {
        formatter: data => {
          return {
            name: `formatter ${data.name}`,
            age: data.age + 1,
          }
        },
      },
    },
    [useFormatterPlugin],
  )
</script>
