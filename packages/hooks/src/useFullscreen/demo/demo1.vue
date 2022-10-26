<template>
  <div style="background:white">
    <div style="margin-bottom: 16px ">
      <button id="fullscreen-img" style="width: 320" alt="" />
    </div>
    <button type="button" @click="enterFullscreen">
      enterFullscreen
    </button>
  </div>
</template>

<script lang="ts" setup>
import { useFullscreen } from 'vue-hooks-plus'

const [, { enterFullscreen }] = useFullscreen(() => document.getElementById('fullscreen-img'));

</script>
