<template>
  <div
    ref="dragRef"
    style="border:1px solid #e8e8e8; padding: 16px; width: 100px; text-align: center; margin-right: 16px;"
  >
    {{ dragging ? 'dragging' : `box-${data}` }}
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useDrag, useBoolean } from 'vue-hooks-plus'

  const props = defineProps<{
    data?: string
  }>()
  const [dragging, { set: setDragging }] = useBoolean(false)
  const dragRef = ref(null)

  useDrag(props.data, dragRef, {
    onDragStart: () => {
      setDragging(true)
    },
    onDragEnd: () => {
      setDragging(false)
    },
  })
</script>
