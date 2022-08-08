<template>
	<div>
		<div>count1: {{ count1 }}</div>
		<button @click="count1 += 1">新增</button>
	</div>
	<div>
		<div>count2: {{ count2 }}</div>
		<button @click="count2 += 1">新增</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useTrackedEffect } from 'vue-hooks-plus'

const count1 = ref(0)
const count2 = ref(0)

useTrackedEffect(
	(changes) => {
		console.log('Index of changed dependencies: ', changes)
	},
	[count1, count2]
)
</script>

<style scoped lang="less"></style>
