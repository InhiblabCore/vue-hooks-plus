<template>
  <div ref="curRef">
    <div style="margin: bottom 16px;" :style="isFullscreen ? 'Fullscreen' : 'Not fullscreen'" />
    <div>
      <vhp-button type="button" @click="enterFullscreen">
        enterFullscreen
      </vhp-button>
      <vhp-button type="button" @click="exitFullscreen" style="margin:0 8px">
        exitFullscreen
      </vhp-button>
      <vhp-button type="button" @click="toggleFullscreen">
        toggleFullscreen
      </vhp-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useFullscreen } from 'vue-hooks-plus'

  const curRef = ref(null)
  const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(
    curRef,
  )
</script>
