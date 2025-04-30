<template>
	<div class="NotesManager">
		<SearchInput />
		<SortButton />
		<ChangeThemeButton />
	</div>
</template>

<script setup lang="ts">
	import { SearchInput, SortButton, ChangeThemeButton } from '../components/index.ts';
</script>

<style scoped>
	.NotesManager {
		display: flex;
		margin-top: 30px;
		gap: 16px;
	}

	@media (max-width: 320px) {
		.NotesManager {
			flex-direction: column-reverse;
			align-items: center;
		}
	}
</style>
