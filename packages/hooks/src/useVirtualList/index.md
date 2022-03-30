```vue
<template>
  <div
    :ref="container.ref"
    :style="{ height: '600px', overflow: 'auto', border: '1px solid' }"
    @scroll="container.onScroll"
  >
    <div ref="wrapperRef">
      <div
        v-for="ele in list"
        :style="{
          height: '60px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #e8e8e8',
          marginBottom: '8px',
        }"
        :key="ele.index"
      >
        Row: {{ ele.data }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVirtualList from "@/hooks/useVirtualList";

const originalList = computed(() => Array.from(Array(999).keys()));
const wrapperRef = ref();
const [list, container] = useVirtualList(originalList, {
  wrapperTarget: wrapperRef,
  itemHeight: 60,
  overscan: 10,
});
</script>

<style scoped lang="less"></style>
```

## 动态元素高度

```vue
<template>
  <div
    :ref="container.ref"
    :style="{ height: '600px', overflow: 'auto', border: '1px solid' }"
    @scroll="container.onScroll"
  >
    <div ref="wrapperRef">
      <div
        v-for="ele in list"
        :style="{
          height: ele.index % 2 === 0 ? '42px' : '84px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid #e8e8e8',
          marginBottom: '8px',
        }"
        :key="ele.index"
      >
        Row: {{ ele.data }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useVirtualList from "@/hooks/useVirtualList";

const originalList = computed(() => Array.from(Array(99).keys()));

const wrapperRef = ref();
const [list, container] = useVirtualList(originalList, {
  wrapperTarget: wrapperRef,
  itemHeight: (i) => (i % 2 === 0 ? 42 + 8 : 84 + 8),
  overscan: 10,
});
</script>

<style scoped lang="less"></style>
```
