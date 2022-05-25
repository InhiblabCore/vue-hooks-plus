<template>
	<p>{{ JSON.stringify(scroll) }}</p>
	<div
		:style="{
			height: '160px',
			width: '160px',
			border: 'solid 1px #000',
			overflow: 'scroll',
			whiteSpace: 'nowrap',
			fontSize: '32px',
		}"
		ref="domRef"
	>
		<div>
			I like study I like study I like study I like study I like study
		</div>
		<div>
			I like study I like study I like study
		</div>
		<div>
			I like study
		</div>
		<div>
			I like study
		</div>
		<div>
			I like study
		</div>
		<div>I like study</div>
		<div>
			I like study
		</div>
		<div>
			I like study
		</div>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useScroll } from 'vue3-hooks-plus'
const domRef = ref(null)
const scroll = useScroll(domRef)
</script>

<style scoped lang="less"></style>
