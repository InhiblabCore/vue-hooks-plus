<template>
	<div>A组件props event通信： {{ count }}</div>
	<div style="margin-top: 8px;">
		<a @click="changeGlobal">子组件A内进行全局</a>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { useEventEmitter } from 'vue3-hooks-plus'

const event = useEventEmitter({ global: true })
const props = defineProps<{
	event: any
}>()
const count = ref(0)

props.event.useSubscription('change', () => {
	count.value += 1
})

const changeGlobal = () => {
	event.emit('change')
}
</script>

<style scoped lang="less"></style>
