<template>
	<div>{{ JSON.stringify(result) }}</div>
</template>

<script lang="ts" setup>
import { useData } from 'vue3-hooks-plus'

const { transform } = useData()

const result = transform({
	type: 'sortBy',
	data: [
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 123,
		},
		{
			name: '123',
			age: 1234,
		},
	],
	fields: ['age'],
	order: 'DESC',
})
</script>

<style scoped lang="less"></style>
