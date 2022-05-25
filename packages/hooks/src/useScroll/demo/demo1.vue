<template>
	<div>
		<p>{{ JSON.stringify(scroll) }}</p>
	</div>
</template>

<script lang="ts" setup>
import { useScroll } from 'vue3-hooks-plus'
const scroll = useScroll(document)
</script>

<style scoped lang="less"></style>
