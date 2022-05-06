<template>
	<div>
		<p>
			{{ value ? '最小尺寸大于320px' : '小于320px' }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { useMedia } from 'vue3-hooks-plus'

const value = useMedia(['(min-width: 320px)'], [true], false)
</script>

<style scoped lang="less"></style>
