<template>
	<div>
		<input
			type="text"
			:value="message"
			@change="change"
			placeholder="请输入"
			style="width: 300px;"
		/>
	</div>
</template>

<script lang="ts" setup>
//@ts-ignore
import { useCookieState } from 'vue3-hooks-plus'
const [message, setMessage] = useCookieState('useCookieStateString')

const change = (e: Event) => {
	//@ts-ignore
	setMessage(e.target.value)
}
</script>

<style scoped lang="less"></style>
