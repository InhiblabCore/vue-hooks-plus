<template>
	<div>
		<p :style="darkMode ? theme.dark : theme.light">
			当前模式: {{ darkMode ? 'dark' : 'light' }}
		</p>
		<div>
			<button @click="() => setDarkMode(true)">dark</button>
			<button style="margin-left: 16px;" @click="() => setDarkMode(false)">
				light
			</button>
			<button style="margin-left: 16px;" @click="() => setDarkMode(undefined)">
				跟随系统
			</button>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { useDarkMode } from 'vue-hooks-plus'

const [darkMode, setDarkMode] = useDarkMode()

const theme = {
	dark: {
		backgroundColor: '#000',
		color: 'white',
	},
	light: {
		backgroundColor: '#fff',
		color: 'black',
	},
}
</script>

<style scoped lang="less"></style>
