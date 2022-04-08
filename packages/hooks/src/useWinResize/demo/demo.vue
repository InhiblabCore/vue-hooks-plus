<template>
	<div>Windows尺寸变化 {{ countRef }} 次</div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

// @ts-ignore
import { useWinResize } from 'vue3-hooks-plus'

const countRef = ref(0)
useWinResize(() => (countRef.value += 1))
</script>
<style scoped lang="less"></style>
