<template>
  <div>
    <div
      ref="domRef"
      :style="{
        width: width + 'px',
        padding: '12',
        border: '1px solid #000',
        marginBottom: '8px',
        backgroundColor: 'rgba(188, 189, 190, 0.3)',
      }"
    >
      current width：{{ width }} px
    </div>
    <vhp-button @click="setWidth()">widening</vhp-button>
    <p>Mutation count {{ count }}</p>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import { useMutationObserver } from 'vue-hooks-plus'

  const domRef = ref(undefined)
  const width = ref(200)
  const count = ref(0)

  useMutationObserver(
    mutationsList => {
      mutationsList.forEach(() => {
        count.value += 1
      })
    },
    domRef,
    { attributes: true },
  )

  const setWidth = () => {
    width.value += 10
  }
</script>
