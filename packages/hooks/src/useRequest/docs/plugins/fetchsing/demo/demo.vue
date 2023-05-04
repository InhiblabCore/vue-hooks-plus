<template>
  <demo1 />
  <demo2 />
  <demo3 />
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'
  import { defineComponent, h } from 'vue'
  import { useFetchingPlugin } from '@vue-hooks-plus/use-request-plugins'
  import Demo3 from './demo3.vue'

  const demo1 = defineComponent({
    setup: () => {
      function getUsername(params: { desc: string }): Promise<string> {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(`vue-hooks-plus ${params.desc}`)
          }, 1000)
        })
      }
      const { data, loading } = useRequest(
        () => getUsername({ desc: 'good' }),
        {
          fetchingKey: () => {
            return 'one'
          },
          onFetching: (current: any, record: any) => {
            console.log(current)
            console.log(record)
          },
          isFetching: (v: any) => {
            console.log(v)
          },
        },
        [useFetchingPlugin],
      )
      return () => {
        return h('div', {}, [
          h('h3', 'demo1'),
          h('div', null, loading.value ? 'loading' : data.value),
        ])
      }
    },
  })

  const DemoGlobal = defineComponent({
    setup: () => {
      function getUsername(params: { desc: string }): Promise<string> {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(`vue-hooks-plus ${params.desc}`)
          }, 2000)
        })
      }
      const { data, loading } = useRequest(
        () => getUsername({ desc: 'good' }),
        {
          // manual: true,
          fetchingKey: () => {
            return 'two'
          },
          onFetching: (current: any, record: any) => {
            console.log(current)
            console.log(record)
          },
        },
        [useFetchingPlugin],
      )

      // run()
      return () => {
        return h('div', {}, [
          h('h3', 'demo2'),
          h('div', null, loading.value ? 'loading' : data.value),
        ])
      }
    },
  })

  const demo2 = defineComponent({
    setup: () => {
      return () => {
        return h(DemoGlobal)
      }
    },
  })
</script>
