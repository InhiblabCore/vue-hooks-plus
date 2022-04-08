<template>
	<div style="margin-top: 16px;">全局事件: {{ globalCount }}</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// @ts-ignore
import { useEventEmitter } from 'vue3-hooks-plus'

const event = useEventEmitter({ global: true })
const globalCount = ref(0)

event.useSubscription('change', () => {
	globalCount.value += 1
})
</script>

<style scoped lang="less"></style>
