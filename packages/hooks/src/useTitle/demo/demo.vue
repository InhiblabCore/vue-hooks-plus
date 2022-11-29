<template>
  <div>设置标题：hellovue-hooks-plus</div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useTitle } from 'vue-hooks-plus'

  const title = ref('hello vue-hooks-plus')
  useTitle(title)
</script>
