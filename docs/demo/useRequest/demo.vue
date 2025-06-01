<template>
  <div>name：{{ loading ? 'loading' : data }}</div>
  <h3>UseRequest component</h3>
  <use-request-user-name
    :service="
      () =>
        getUsername({
          desc,
        })
    "
    :refreshDeps="[desc]"
  >
    <template #default="{data,refresh,loading}">
      <div>name：{{ data }}</div>
      <vhp-button v-if="!loading.value" @click="refresh()">refresh</vhp-button>
    </template>
    <template #loading>
      <div>loading</div>
    </template>
    <template #error>
      <div>error</div>
    </template>
  </use-request-user-name>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue'
  import { useRequest, createUseRequestComponent } from 'vue-hooks-plus'

  const desc = ref('good')
  const UseRequestUserName = createUseRequestComponent<string>()
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
