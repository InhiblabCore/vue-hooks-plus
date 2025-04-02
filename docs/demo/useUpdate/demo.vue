<template>
  <div>
    <div>Time: {{ date }}</div>
    <vhp-button class="btn" type="vhp-button" @click="() => setUpdate()">update</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { watch, ref } from 'vue'
  import { useUpdate } from 'vue-hooks-plus'

  const { update, setUpdate } = useUpdate()
  const date = ref(Date.now())

  watch(update, () => {
    date.value = Date.now()
  })
</script>
