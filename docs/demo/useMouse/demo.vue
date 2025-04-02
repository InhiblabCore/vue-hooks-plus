<template>
  <div>
    <p>Client - x: {{ mouse.clientX }}, y: {{ mouse.clientY }}</p>
    <p>Page - x: {{ mouse.pageX }}, y: {{ mouse.pageY }}</p>
    <p>Screen - x: {{ mouse.screenX }}, y: {{ mouse.screenY }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { useMouse } from 'vue-hooks-plus'
  const mouse = useMouse()
</script>
