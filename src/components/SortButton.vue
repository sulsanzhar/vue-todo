<template>
	<div class="dropdown-container">
		<button class="sort-button" @click="toggleDropdown">
			{{ selectedOption }}
			<img
				src="../assets/arrowDown-icon.svg"
				alt="arrow-down"
				class="arrow-icon"
				:class="{ rotated: isOpen }"
			/>
		</button>
		<ul v-if="isOpen" class="dropdown-menu">
			<li
				v-for="option in options"
				:key="option"
				@click="selectOption(option)"
				class="dropdown-item"
			>
				{{ option }}
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
	import { ref, inject } from 'vue';

	const sortHandler = inject<{ (option: string): void }>('sortTask');

	const options = ['All', 'Completed', 'In Progress'];
	const selectedOption = ref('All');
	const isOpen = ref(false);

	const toggleDropdown = () => (isOpen.value = !isOpen.value);

	function selectOption(option: string) {
		selectedOption.value = option;
		isOpen.value = false;
		if (sortHandler) sortHandler(option);
	}
</script>

<style scoped>
	.dropdown-container {
		position: relative;
		display: inline-block;
	}

	.sort-button {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 18px;
		background-color: #6c63ff;
		color: white;
		border: none;
		border-radius: 5px;
		padding: 8px 16px;
		cursor: pointer;
		width: 150px;
	}

	.arrow-icon {
		width: 15px;
		margin-left: 8px;
		transition: transform 0.3s ease;
	}

	.arrow-icon.rotated {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		background: white;
		border: 1px solid #ddd;
		border-radius: 5px;
		margin-top: 4px;
		z-index: 10;
		padding: 0;
		list-style: none;
	}

	.dropdown-item {
		padding: 8px 12px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.dropdown-item:hover {
		background: #f0f0f0;
	}
</style>
