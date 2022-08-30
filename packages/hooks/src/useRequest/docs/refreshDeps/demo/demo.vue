<template>
  <div>参数值：{{ id }}</div>
  <div style="margin-top: 16px;">
    <button @click="() => (store.id = 1)">改变ID为 1</button>
    <button @click="() => (store.id = 2)" style="margin-left: 16px;">
      改变ID为 2
    </button>
    <button @click="() => (id = 3)" style="margin-left: 16px;">
      改变ID为 3
    </button>
  </div>
  <div style="margin-top: 16px;">读取值：{{ data }}</div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue'

  import { useRequest } from 'vue-hooks-plus'

  function getUsername(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`${String(Date.now())}`)
      }, 1000)
    })
  }
  const id = ref(1)
  const store = reactive({
    id: 1,
  })
  const { data } = useRequest(() => getUsername(), {
    refreshDeps: [id, () => store.id],
    onSuccess: data => {
      console.log(data)
    },
  })
</script>

<style scoped lang="less"></style>
