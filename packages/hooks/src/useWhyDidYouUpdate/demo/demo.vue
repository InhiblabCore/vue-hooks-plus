<!-- 
  <template>
	<div>
		<div>number: {{ count }}</div>
		<div>
			randomNum: {{ mathRef }}
			<vhp-button @click="() => (mathRef = Math.random())" style="margin-left: 8px">
				🎲
			</vhp-button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, toRef, toRefs, computed } from 'vue'
 
import { useWhyDidYouUpdate } from 'vue-hooks-plus'

const props = defineProps<{
	count: number
}>()

const mathRef = ref(Math.random())
useWhyDidYouUpdate('useWhyDidYouUpdateComponent', {
	...toRefs(props),
	mathRef,
})
</script>



 -->

<template>
  <div>
    <demo-item :count="count" />
    <vhp-button @click="count += 1">+</vhp-button>
    <vhp-button @click="count -= 1" style="margin-left: 8px;">-</vhp-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'
  import DemoItem from './DemoItem.vue'

  const count = ref(0)
</script>
