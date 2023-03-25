<template>
  <demo1 />
  <demo2 />
</template>

<script lang="ts" setup>
  import { useRequest, useRequestProvider } from 'vue-hooks-plus'
  import { defineComponent, h } from 'vue'

  const demo1 = defineComponent({
    setup: () => {
      function getUsername(params: { desc: string }): Promise<string> {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(`vue-hooks-plus ${params.desc}`)
          }, 1000)
        })
      }
      const { data, loading } = useRequest(() => getUsername({ desc: 'good' }))
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
          }, 1000)
        })
      }
      const { data, loading } = useRequest(() => getUsername({ desc: 'good' }), {
        // manual: true,
        onSuccess: res => {
          // debugger
          console.log(res)
        },
      })

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
      useRequestProvider({ pollingInterval: 2000 })
      return () => {
        return h(DemoGlobal)
      }
    },
  })
</script>
