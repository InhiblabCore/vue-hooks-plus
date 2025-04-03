<template>
  <demo />
</template>

<script lang="ts" setup>
  import { useRequest } from 'vue-hooks-plus'
  import { defineComponent, h } from 'vue'

  const demo = defineComponent({
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
          h('div', null, loading.value ? 'loading' : data.value),
          h('div', null, data.value),
        ])
      }
    },
  })
</script>

<style scoped lang="less"></style>
