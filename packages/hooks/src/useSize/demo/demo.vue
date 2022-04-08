<template>
  <div>
    <div ref="divRef">
      此元素的尺寸为：width:{{ size?.width }}px-----height:{{ size?.height }}px
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useSize } from 'vue3-hooks-plus';

const divRef = ref();
const size = useSize(divRef);
</script>
<style scoped lang="less"></style>
