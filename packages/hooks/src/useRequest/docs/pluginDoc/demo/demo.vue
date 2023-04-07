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
  formatter: (data?: FormatterDataType) => { name: string; age: number }
}

const useFormatterPlugin: UseRequestPlugin<
  FormatterDataType,
  [],
  {
    formatter: CustomPluginFieldType['formatter']
  }
> = (fetchInstance, { formatter }) => {
  return {
    onSuccess: () => {
      fetchInstance.setFetchState(formatter?.(fetchInstance.state.data), 'data')
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
    formatter: (params?: FormatterDataType) => {
      return {
        name: `${params?.name} - plugins update`,
        age: 20
      }
    },
  },
  [useFormatterPlugin],
)
</script>
