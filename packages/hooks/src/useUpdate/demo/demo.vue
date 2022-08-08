<template>
	<div>
		<div>Time: {{ date }}</div>
		<button type="button" @click="() => setUpdate()">update</button>
	</div>
</template>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import { useUpdate } from 'vue-hooks-plus'

const { update, setUpdate } = useUpdate()
const date = ref(Date.now())

watch(update, () => {
	date.value = Date.now()
})
</script>

<style scoped lang="less"></style>
