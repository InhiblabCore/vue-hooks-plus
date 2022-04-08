<template>
	<div>
		<demo-item :count="count" />
		<button @click="count += 1">新增</button>
		<button @click="count -= 1">减少</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DemoItem from './DemoItem.vue'

const count = ref(0)
</script>

<style scoped lang="less"></style>
