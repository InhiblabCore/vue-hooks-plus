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
      inViewport: {{ inViewport ? 'visible' : 'hidden' }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useInViewport } from 'vue-hooks-plus'

  const domRef = ref(null)
  const [inViewport] = useInViewport(domRef)
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
    text-align: center;
    margin-top: 80px;
  }
</style>
