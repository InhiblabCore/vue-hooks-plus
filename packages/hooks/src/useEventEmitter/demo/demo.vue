<template>
	<div>
		<div>
			<button @click="changeGlobal">
				全局事件通信
			</button>
			<button @click="changeA" style="margin-left: 16px;">子事件A通信</button>
		</div>
		<div>
			<global-demo />
			<demo-a :event="eventA" />
		</div>
	</div>
</template>

<script lang="ts" setup>
import GlobalDemo from './GlobalDemo.vue'
import DemoA from './DemoA.vue'

import { useEventEmitter } from 'vue-hooks-plus'

const eventGlobal = useEventEmitter({ global: true })
const eventA = useEventEmitter()

const changeGlobal = () => {
	eventGlobal.emit('change')
}

const changeA = () => {
	// globalCount.value += 1
	eventA.emit('change')
}
</script>

<style scoped lang="less"></style>
