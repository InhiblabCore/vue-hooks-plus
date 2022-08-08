<script setup lang="ts">
const props = defineProps<{
	data: any
}>()

console.log(props)
</script>

<template>
	<div class="container">
		<img
			loading="lazy"
			width="150"
			height="150"
			m-auto
			rounded-full
			min-w-25
			min-h-25
			h-25
			w-25
			:src="data.avatar"
			:alt="`${data.name}'s avatar`"
		/>
		<div class="name">
			{{ data.name }}
		</div>
		<div class="description" v-html="data.description" />

		<div flex="~ inline gap-2" py2 text-2xl>
			<a
				class="i-carbon-logo-github inline-block text-current op30 hover:op100 mya transition duration-200"
				:href="`https://github.com/${data.github}`"
				target="_blank"
				rel="noopener noreferrer"
				:aria-label="`${data.name} on GitHub`"
			/>
			<a
				v-if="data.twitter"
				class="i-carbon-logo-twitter inline-block text-1.3em mya text-current op30 hover:op100 transition duration-200"
				:href="`https://twitter.com/${data.twitter}`"
				target="_blank"
				rel="noopener noreferrer"
				:aria-label="`${data.name} on Twitter`"
			/>
			<a
				v-if="data.sponsors"
				class="i-carbon-favorite-filled inline-block mya text-current op30 hover:op100 transition duration-200"
				:href="`https://github.com/sponsors/${data.github}`"
				target="_blank"
				rel="noopener noreferrer"
				:title="`Sponsor ${data.name}`"
				:aria-label="`Sponsor ${data.name}`"
			/>
		</div>
		<div
			v-if="data.functions || data.packages"
			bg-gray:5
			mb2
			p2
			rounded
			grid="~ cols-[20px_1fr] gap-y-2"
			items-start
			w="5/6"
			mxa
		>
			<template v-if="data.functions">
				<!-- <div op50 i-carbon:function-math title="Functions" /> -->
				<div>
					<a
						v-for="f of data.functions"
						:key="f"
						:href="`/${f}`"
						target="_blank"
					>
						<code>{{ f }}</code>
					</a>
				</div>
			</template>
			<template v-if="data.packages">
				<!-- <div /> -->
				<div class="code">
					<a v-for="f of data.packages" :key="f" href="">
						<code>{{ f }}</code>
					</a>
				</div>
			</template>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
img {
	min-height: 4.75rem;
	min-width: 4.75rem;
	border-radius: 4.75rem;
}

.name,
.description {
	margin-top: 16px;
	zoom: 0.85;
}

.description {
	color: var(--vp-font-color);
}
.code {
	background-color: var(--vp-code-block-bg);
	display: flex;
	flex-direction: column;
	padding: 12px;
	border-radius: 5px;
	margin-top: 12px;
}
</style>
