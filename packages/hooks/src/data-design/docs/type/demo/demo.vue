<template>
	<h3>isArray是否是数组</h3>
	<br />
	<div>{{ JSON.stringify([1, 2, 3]) }}是{{ result }}</div>
	<div>1是{{ result1 }}</div>
</template>

<script lang="ts" setup>
import { useDataDesign } from 'vue3-hooks-plus'

const { dataType } = useDataDesign()
const result = dataType({
	type: 'isArray',
	target: [1, 2, 3],
})
const result1 = dataType({
	type: 'isArray',
	target: 1,
})
</script>

<style scoped lang="less"></style>
