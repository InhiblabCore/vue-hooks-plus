<template>
	<div>{{ JSON.stringify(result) }}</div>
</template>

<script lang="ts" setup>
import { useDataDesign } from 'vue3-hooks-plus'

const { transform } = useDataDesign()

const result = transform({
	type: 'flatTree',
	data: [
		{
			name: '1',
			parentId: null,
			id: 100,
			age: 123,
			children: [
				{
					parentId: 100,
					name: '2',
					age: 123,
					id: 200,
					children: [{ name: '3', age: 1234, parentId: 200, id: 300 }],
				},
				{
					parentId: 100,
					name: '2',
					age: 123,
					id: 201,
					children: [{ name: '23', age: 12345, parentId: 201, id: 302 }],
				},
			],
		},
	],
	flatKey: 'children',
})

console.log(result)
</script>

<style scoped lang="less"></style>
