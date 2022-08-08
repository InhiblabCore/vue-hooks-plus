<script setup lang="ts">
import { contributors, coreTeamMembers } from '../../../contributors'
import TeamMember from './TeamMember.vue'

console.log(coreTeamMembers)
</script>

<template>
	<div>
		<h2 class="name">
			Meet The Team
		</h2>
	</div>
	<div class="main">
		<div class="grid">
			<TeamMember v-for="c of coreTeamMembers" :key="c.github" :data="c" />
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
}

h2 {
	text-align: center;
	color: var(--vp-font-color);
}

.main {
	/* padding: 96px 32px; */
	text-align: center;
}

.grid {
	display: grid;
	grid-row-gap: 0.45rem;
	grid-column-gap: 3rem;
	grid-template-columns: repeat(4, 1fr);
	padding-left: 184px;
	padding-right: 184px;
}

.grid div {
	padding: 42px 32px;
}

@media (max-width: 1450px) {
	.grid {
		display: grid;
		grid-row-gap: 0.45rem;
		grid-column-gap: 3rem;
		grid-template-columns: repeat(3, 1fr);
		padding-left: 124px;
		padding-right: 124px;
	}

	.grid div {
		padding: 42px 32px;
	}
}
@media (max-width: 1100px) {
	.grid {
		display: grid;
		grid-row-gap: 0.45rem;
		grid-column-gap: 3rem;
		grid-template-columns: repeat(2, 1fr);
		padding-left: 64px;
		padding-right: 64px;
	}

	.grid div {
		padding: 42px 32px;
	}
}
@media (max-width: 768px) {
	.grid {
		display: grid;
		grid-row-gap: 24px;
		grid-column-gap: 3rem;
		grid-template-columns: repeat(1, 1fr);
	}

	.grid div {
		padding: 12px 12px;
	}
}
@media (max-width: 370px) {
	.tagline {
		font-size: 36px;
	}
}
</style>
