<template>
  <div>
    <div class="container">
      scroll here
      <div style="height: 800px">
        <div ref="domRef" class="observer">
          observer dom
        </div>
      </div>
    </div>
    <div :style="{ marginTop: 16, color: inViewport ? '#87d068' : '#f50' }">
      <p>inViewport: {{ inViewport ? 'visible' : 'hidden' }}</p>
      <p>ratio: {{ ratio }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useInViewport } from 'vue-hooks-plus'

  const domRef = ref(null)
  const [inViewport, ratio] = useInViewport(domRef, {
    threshold: [0, 0.25, 0.5, 0.75, 1],
    root: () => document.getElementById('container'),
  })
</script>

<style scoped lang="less">
  .container {
    width: 100%;
    height: 300px;
    overflow: scroll;
    border: '1px solid';
  }

  .observer {
    border: 1px solid;
    height: 100px;
    width: 100px;
    textalign: center;
    margintop: 80px;
  }
</style>
