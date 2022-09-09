<template>
  <div>
    <div style="height: 50px; text-align: end">
      <input type="number" v-model="number">
      <vhp-button @click="scrollToNuber()">scroll to</vhp-button>
    </div>

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
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid #e8e8e8',
            marginBottom: '8px',
          }"
          :key="ele.index"
        >
          第 {{ ele.data }} 行
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useVirtualList } from 'vue-hooks-plus'

  const originalList = computed(() => Array.from(Array(999).keys()))
  const wrapperRef = ref()
  const [list, container, scrollTo] = useVirtualList(originalList, {
    wrapperTarget: wrapperRef,
    itemHeight: 60,
    overscan: 10,
  })

  const number = ref(0)

  const scrollToNuber = () => {
    scrollTo(number.value)
  }
</script>

<style scoped lang="less"></style>
