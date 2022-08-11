<template>
	<div>
		<div>body：width:{{ size?.width }}px-----height:{{ size?.height }}px</div>
	</div>
</template>

<script lang="ts" setup>
import { useSize } from 'vue-hooks-plus'

const size = useSize(document.querySelector('body'))
</script>
<style scoped lang="less"></style>
