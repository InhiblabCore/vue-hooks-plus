<template>
	<div>
		<div>禁用浏览器行为 上下文菜单、选择、复制,f12事件</div>
		<br />
		<div>
			<p><button @click="startRunDisableBrowserBehavior()">开始禁用</button></p>
			<p><button @click="stopRunDisableBrowserBehavior()">结束禁用</button></p>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useDisableBrowserBehavior } from 'vue3-hooks-plus'

const {
	startRun: startRunDisableBrowserBehavior,
	stopRun: stopRunDisableBrowserBehavior,
} = useDisableBrowserBehavior({
	browserEvent: ['contextmenu', 'selectstart', 'copy'],
	keydown: ['F12'],
	browserConsole: false,
})
</script>

<style scoped lang="less">
p button:nth-child(n) {
	margin-left: 16px;
}
</style>
