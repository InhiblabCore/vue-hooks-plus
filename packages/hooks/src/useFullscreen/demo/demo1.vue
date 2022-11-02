<template>
  <div>
    <div style="margin-bottom: 16px ">
      <img id="fullscreen-img" :src="img" style="width: 320px" alt="">
    </div>
    <vhp-button type="button" @click="enterFullscreen">
      enterFullscreen
    </vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { useFullscreen } from 'vue-hooks-plus'

  const img = 'https://v2.cn.vuejs.org/images/logo.svg'

  const [, { enterFullscreen }] = useFullscreen(() => document.getElementById('fullscreen-img'))
</script>
