<template>
	<div
		ref="divRef"
		:style="{
			padding: '16px',
			backgroundColor: isFocusWithin ? 'red' : '',
			border: '1px solid gray',
		}"
	>
		<label style="display: block"> 输入: <input /> </label>
		<p>isFocusWithin: {{ JSON.stringify(isFocusWithin) }}</p>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

//@ts-ignore
import { useFocusWithin } from 'vue3-hooks-plus'
const divRef = ref(null)

const isFocusWithin = useFocusWithin(divRef, {
	onFocus: () => {
		console.log('focus')
	},
	onBlur: () => {
		console.log('blur')
	},
})
</script>

<style scoped lang="less"></style>
