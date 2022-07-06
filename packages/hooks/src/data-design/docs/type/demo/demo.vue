<template>
	<div>{{ a }}</div>
	<div>{{ a1 }}</div>
</template>

<script lang="ts" setup>
import { useData } from 'vue3-hooks-plus'

const { dataType } = useData()
const a = dataType({
	type: 'isArray',
	target: [1, 2, 3],
})
const a1 = dataType({
	type: 'isArray',
	target: 1,
})
</script>

<style scoped lang="less"></style>
