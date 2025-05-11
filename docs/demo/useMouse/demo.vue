<template>
  <div>
    <p>Client - x: {{ mouse.clientX }}, y: {{ mouse.clientY }}</p>
    <p>Page - x: {{ mouse.pageX }}, y: {{ mouse.pageY }}</p>
    <p>Screen - x: {{ mouse.screenX }}, y: {{ mouse.screenY }}</p>
    <UseMouse v-slot="{ clientX, clientY }">
      <p>component use: {{ clientX }}, y: {{ clientY }}</p>
    </UseMouse>
  </div>
</template>

<script lang="ts" setup>
  import { useMouse, UseMouse } from 'vue-hooks-plus'
  const mouse = useMouse()
</script>
