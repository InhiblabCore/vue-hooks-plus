<template>
  <div>
    <div>count:{{ count }}</div>
    <vhp-button type="vhp-button" @click="() => count++">Add</vhp-button>
    <vhp-button type="vhp-button" style="margin-left:16px" @click="() => setUpdate()"
    >Refresh Page</vhp-button
    >
  </div>
</template>

<script lang="ts" setup>
  import { watch, ref, onMounted } from 'vue'
  import { useUpdate } from 'vue-hooks-plus'

  const { update, setUpdate } = useUpdate()
  const count = ref(0)

  onMounted(() => {
    console.log('mounted!')
  })

  watch(update, () => {
    location.hash = `${Date.now()}`
  })
</script>
