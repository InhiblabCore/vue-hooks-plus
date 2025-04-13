<template>
  <div>Origin name: {{ loading ? 'loading' : data }}</div>
  <div>Format: {{ loading1 ? 'loading' : JSON.stringify(formatData) }}</div>
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'

  import { UseRequestPlugin } from 'vue-hooks-plus/es/useRequest/types'

  const useTrackerPlugin: UseRequestPlugin<any, []> = () => {
    return {
      name: 'trackerPlugin',
      onSuccess: (data, params, origin) => {
        console.log('format data', data)
        console.log('format before origin', origin)
        console.log('params', params)
      },
      onError: () => {},
    }
  }

  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`vue-hooks-plus ${params.desc}`)
      }, 1000)
    })
  }

  const { data, loading } = useRequest(() => getUsername({ desc: 'good' }))

  const { data: formatData, loading: loading1 } = useRequest(
    () => getUsername({ desc: 'good' }),
    {
      formatResult(res) {
        return {
          name: `formatter ${res}`,
          age: 18,
        }
      },
    },
    [useTrackerPlugin],
  )
</script>
