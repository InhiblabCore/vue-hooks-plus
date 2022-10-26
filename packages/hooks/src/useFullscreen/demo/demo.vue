
<template>
  <div ref="curRef" style="background:  white">
    <div style="margin: bottom 16px;" :style="isFullscreen ? 'Fullscreen' : 'Not fullscreen'" />
    <div>
      <button type="button" @click="enterFullscreen">
        enterFullscreen
      </button>
      <button type="button" @click="{exitFullscreen}" style="margin:0 8px">
        exitFullscreen
      </button>
      <button type="button" @click="{toggleFullscreen}">
        toggleFullscreen
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFullscreen } from 'vue-hooks-plus'

const curRef = ref(null);
const [isFullscreen, { enterFullscreen, exitFullscreen, toggleFullscreen }] = useFullscreen(curRef);

</script>





