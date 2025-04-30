<script setup lang="ts">
	import { inject } from 'vue';

	const searchInput = inject<(value: string) => void>('searchTask');

	function searchValueHandler(e: Event) {
		const target = e.target as HTMLInputElement;

		if (searchInput) searchInput(target.value.toLowerCase());
	}
</script>

<template>
	<div class="search-input">
		<input @input="searchValueHandler" placeholder="Search note..." />
		<img src="../assets/search-icon.svg" alt="search-icon" />
	</div>
</template>

<style scoped>
	.search-input {
		position: relative;
	}

	.search-input input {
		width: 595px;
		padding: 9px 16px;
		border: 1px solid #6c63ff;
		border-radius: 5px;
		font-size: 16px;
		transition: border-color 0.2s ease; /* Плавный переход для изменения цвета */
	}

	.search-input input:focus {
		border-color: #6c63ff; /* Устанавливаем фиолетовый цвет для активного состояния */
		outline: none; /* Убираем стандартную обводку браузера */
	}

	.search-input img {
		width: 21px;
		position: absolute;
		right: 16px;
		top: 12px;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		.search-input {
			display: none;
		}
	}
</style>
