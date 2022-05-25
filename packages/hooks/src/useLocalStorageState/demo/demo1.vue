<template>
	<div>
		<p>{{ value?.join('-') }}</p>
		<button
			type="button"
			style="margin-right: 16px"
			@click="
				() =>
					setValue([
						// @ts-ignore
						...value,
						Math.random()
							.toString(36)
							.slice(-1),
					])
			"
		>
			push random
		</button>
		<button type="button" @click="() => setValue(defaultArray)">
			reset
		</button>
	</div>
</template>

<script lang="ts" setup>
import { useLocalStorageState } from 'vue3-hooks-plus'
const defaultArray = ['a', 'e', 'i', 'o', 'u']

const [value, setValue] = useLocalStorageState(
	'use-local-storage-state-demo2',
	{
		defaultValue: defaultArray,
	}
)
</script>

<style scoped lang="less"></style>
