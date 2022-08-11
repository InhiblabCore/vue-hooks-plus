<template>
	<div>
		<div>Network information:</div>
		<pre>{{ JSON.stringify(networkState, null, 2) }}</pre>
	</div>
</template>

<script lang="ts" setup>
import { useNetwork } from 'vue-hooks-plus'

const networkState = useNetwork()
</script>

<style scoped lang="less"></style>
