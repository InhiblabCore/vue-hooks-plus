<template>
  <div>
    {{ valueRef }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useTimeout } from 'vue-hooks-plus'

  const valueRef = ref(0)
  useTimeout(
    () => {
      valueRef.value += 1
    },
    2000,
    {
      immediate: true,
    },
  )
</script>
