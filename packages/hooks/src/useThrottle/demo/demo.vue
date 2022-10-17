<template>
  <div>
    <input type="text" placeholder="输入" v-model="valueRef">
    <p>500ms后变化：{{ throttledValue }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useThrottle } from 'vue-hooks-plus'
  const valueRef = ref('')

  const throttledValue = useThrottle(valueRef, { wait: 500 })
</script>
<style scoped lang="less"></style>
