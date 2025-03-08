<template>
  <div style="margin-top: 16px">
    <div>
      <vhp-button type="button" @click="count++">count is {{ count }}</vhp-button>
      <div style="opacity: 0.6"> count !==0 and count !==5 ready is true </div>
    </div>
    <br />
    <vhp-button @click="() => (id = 1)">Change ID = 1</vhp-button>
    <vhp-button @click="() => (id = 2)" style="margin-left: 16px">Change ID = 2</vhp-button>
    <vhp-button @click="() => (store.id = 1)" style="margin-left: 16px">
      Change store ID = 1
    </vhp-button>
    <vhp-button @click="() => (store.id = 2)" style="margin-left: 16px">
      Change store ID = 2
    </vhp-button>
  </div>
  <div style="margin-top: 16px">Loading：{{ loading ? 'loading' : '' }}</div>

  <div style="margin-top: 16px">
    <span>Data Value：</span>
    <div>
      <table>
        <thead>
          <th>Time</th>
          <th>Id</th>
          <th>StoreId</th>
          <th>Count</th>
        </thead>
        <tbody>
          <tr>
            <th>{{ data?.time }}</th>
            <th>{{ data?.id }}</th>
            <th>{{ data?.storeId }}</th>
            <th>{{ data?.count }}</th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive, computed } from 'vue'

  import { useRequest } from 'vue-hooks-plus'

  function getUsername({
    id,
    storeId,
    count,
  }: {
    id: number
    storeId: number
    count: number
  }): Promise<{
    time: number | string
    id: number | string
    storeId: number | string
    count: number | string
  }> {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          time: Date.now(),
          id,
          storeId,
          count,
        })
      }, 3000)
    })
  }
  const id = ref(1)
  const store = reactive({
    id: 1,
  })
  const count = ref(0)

  const ready = computed(() => count.value !== 0)
  const { data, loading } = useRequest(
    () => getUsername({ id: id.value, storeId: store.id, count: count.value }),
    {
      initialData: {
        time: Date.now(),
        id: '-',
        count: '-',
        storeId: '-',
      },
      ready,
      debounceWait: 2000,
      refreshDeps: true,
      debugKey: 'test',
    },
  )
</script>
