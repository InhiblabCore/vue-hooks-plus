<template>
  <div style="margin-top: 16px;">
    <div>
      <p>id:{{ id }}</p>
      <p>storeID:{{ store.id }}</p>
    </div>
    <vhp-button @click="() => (id = 1)">改变ID为 1</vhp-button>
    <vhp-button @click="() => (id = 2)" style="margin-left: 16px;">改变ID为 2</vhp-button>
    <vhp-button @click="() => (store.id = 1)" style="margin-left: 16px;">
      改变store ID为 1
    </vhp-button>
    <vhp-button @click="() => (store.id = 2)" style="margin-left: 16px;">
      改变 store ID为 2
    </vhp-button>
  </div>
  <div style="margin-top: 16px;">请求的状态值：{{ loading ? 'loading' : '' }}</div>
  <div style="margin-top: 16px;"
  >请求的Data值： <span>{{ data }}</span>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'

  import { useRequest } from 'vue-hooks-plus'

  function getUsername({ id, storeId }: { id: number; storeId: number }): Promise<string> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(`${String(Date.now())}； \t 参数id: ${id} \t； 参数storeId: ${storeId}`)
      }, 1000)
    })
  }
  const id = ref(1)
  const store = reactive({
    id: 1,
  })
  const { data, loading } = useRequest(() => getUsername({ id: id.value, storeId: store.id }), {
    refreshDeps: [id, () => store.id],
  })
</script>
