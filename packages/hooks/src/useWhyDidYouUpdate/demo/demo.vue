<!-- 
  <template>
	<div>
		<div>number: {{ count }}</div>
		<div>
			randomNum: {{ mathRef }}
			<button @click="() => (mathRef = Math.random())" style="margin-left: 8px">
				🎲
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref, watch, toRef, toRefs, computed } from 'vue'
 
import { useWhyDidYouUpdate } from 'vue3-hooks-plus'

const props = defineProps<{
	count: number
}>()

const mathRef = ref(Math.random())
useWhyDidYouUpdate('useWhyDidYouUpdateComponent', {
	...toRefs(props),
	mathRef,
})
</script>

<style scoped lang="less"></style>

 -->

<template>
	<div>
		<demo-item :count="count" />
		<button @click="count += 1">新增</button>
		<button @click="count -= 1">减少</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DemoItem from './DemoItem.vue'

const count = ref(0)
</script>

<style scoped lang="less"></style>
