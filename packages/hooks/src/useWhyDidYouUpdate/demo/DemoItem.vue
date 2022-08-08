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
import { ref, toRefs } from 'vue'

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

<style scoped lang="less"></style>
