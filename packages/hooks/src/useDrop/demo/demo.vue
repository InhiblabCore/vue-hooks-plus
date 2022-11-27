<!--  DragDemo.vue
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

 -->

<template>
  <div>
    <div
      ref="dropRef"
      style=" border: 1px dashed #e8e8e8 ; padding: 16px; text-align: center;max-height: 400px;overflow-y: scroll;"
    >
      {{ isHovering ? 'release here' : 'drop here' }}

      <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    </div>
    <div style=" margin-top: 8px">
      <drag-demo
        v-for="item in ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13']"
        :key="item"
        :data="item"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  import { useBoolean, useDrop } from 'vue-hooks-plus'
  import DragDemo from './DragDemo.vue'

  const dropRef = ref(null)
  const list = ref([])
  const [isHovering, { set: setIsHovering }] = useBoolean(false)

  useDrop(dropRef, {
    onDom: (content: string, e) => {
      // @ts-ignore
      list.value.push(`custom: ${content} dropped`)
      setIsHovering(false)
    },
    onDragEnter: () => setIsHovering(true),
    onDragLeave: () => setIsHovering(false),
  })
</script>
