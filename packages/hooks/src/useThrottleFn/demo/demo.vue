<template>
	<div>
		<div>点击：{{ valueRef }}</div>
		<button @click="() => run()">点击我！</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useThrottleFn } from 'vue3-hooks-plus'
const valueRef = ref(0)

const { run } = useThrottleFn(
	() => {
		valueRef.value += 1
	},
	{
		wait: 1000,
	}
)
</script>
<style scoped lang="less"></style>
