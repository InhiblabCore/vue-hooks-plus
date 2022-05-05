<template>
	<div>
		<p>
			{{ value ? '最小尺寸大于320px' : '小于320px' }}
		</p>
	</div>
</template>

<script lang="ts" setup>
import { watchEffect } from 'vue'
import { useMedia } from 'vue3-hooks-plus'

const value = useMedia(['(min-width: 320px)'], [true], false)

watchEffect(() => {
	console.log(value.value)
})
</script>

<style scoped lang="less"></style>
