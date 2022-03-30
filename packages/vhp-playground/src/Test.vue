<template>
	<div
		style="
			height: 450px;
			overflow-y: scroll;
			border: 1px solid;
			padding: 12px;
		"
	>
		{{ obj.arr[0] }}
		<Test2 :eventBus="eventBus"></Test2>
	</div>
</template>

<script setup lang="ts">
import useEventEmitter from './useEventEmitter'

import Test2 from './Test2.vue'
import { reactive } from 'vue'

const obj = reactive({
	arr: [1, 2, 3],
})

const eventBus = useEventEmitter()

eventBus?.useSubscription('test1', (value) => {
	console.log('test1', value)
})

eventBus?.useSubscription('test2', (value) => {
	console.log('test2', value)
})

eventBus?.emit('test1', { name: '111' })

eventBus?.emit('test2', { name: 'test2' })

// setTimeout(() => {
//   setState({ page: "1", pageSize: "30" });
// }, 2000);
</script>
