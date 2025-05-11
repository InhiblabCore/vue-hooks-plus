<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <h3>UseRequest component</h3>
  <use-request-query :service="() => getUsername({ desc: desc })" :refresh-deps="[desc]">
    <template #default="{data}">
      <div>name：{{ data }}</div>
    </template>
    <template #loading>
      <div>loading</div>
    </template>
    <template #error>
      <div>error</div>
    </template>
  </use-request-query>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRequest, createUseRequestQueryComponent } from 'vue-hooks-plus'

  const desc = ref('good')
  const UseRequestQuery = createUseRequestQueryComponent<string>()
  function getUsername(params: { desc: string }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`vue-hooks-plus ${params.desc}`)
      }, 1000)
    })
  }

  const { data, loading } = useRequest(() => getUsername({ desc: desc.value }), {
    debugKey: 'demo',
    initialData: '000',
    refreshDeps: [desc],
  })

  onMounted(() => {
    setTimeout(() => {
      desc.value = 'good1111'
    }, 3000)
  })
</script>
