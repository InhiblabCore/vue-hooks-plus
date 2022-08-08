<template>
	<div>
		<div ref="divRef">点击我！</div>
		<br />
		<div>点击：{{ valueRef }}</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useEventListener } from 'vue-hooks-plus'

const divRef = ref()
const valueRef = ref(0)

useEventListener(
	'click',
	() => {
		valueRef.value += 1
	},
	{ target: divRef }
)
</script>

<style scoped lang="less"></style>
