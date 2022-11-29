<template>
  <div
    :ref="container.ref"
    :style="{ height: '300px', overflow: 'auto', border: '1px solid' }"
    @scroll="container.onScroll"
  >
    <div ref="wrapperRef">
      <div
        v-for="ele in list"
        :style="{
          height: '60px',
          border: '1px solid #e8e8e8',
          marginTop: '8px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }"
        :key="ele.index"
      >
        第 {{ ele.data }} 行
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useVirtualList } from 'vue-hooks-plus'

  const originalList = computed(() => Array.from(Array(999).keys()))
  const wrapperRef = ref()
  const [list, container] = useVirtualList(originalList, {
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10,
  })
</script>
