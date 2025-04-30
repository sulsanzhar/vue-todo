<template>
	<ul class="tasks">
		<TaskItem v-for="task in tasks" :key="task.id" :task="task" />
		<div v-if="isLoading" class="empty">
			<Loader />
		</div>
		<div v-if="!isLoading && !tasks.length" class="empty">
			<img src="../../public/detective.png" alt="detective-image" />
			<h2>Empty...</h2>
		</div>
	</ul>
</template>

<script setup lang="ts">
	import { inject } from 'vue';
	import { TaskItem, Loader } from '../components/index.ts';

	const tasks = inject<{ id: string; task: string; done: boolean }[]>('tasks', []);
	const isLoading = inject('isLoading');
</script>

<style scoped>
	.tasks {
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		gap: 34px;
		width: 700px;
		height: 400px;
		overflow-y: auto;
		box-shadow: 0 4px 12px rgba(108, 99, 255, 0.4), 0 8px 20px rgba(108, 99, 255, 0.2);
		border-radius: 10px;
		padding: 20px;
		scrollbar-width: thin;
		scrollbar-color: #6c63ff #f0f0f0;
	}

	.tasks::-webkit-scrollbar {
		width: 15px;
		opacity: 0;
		transition: opacity 0.3s ease;
	}

	.tasks:hover::-webkit-scrollbar {
		opacity: 1;
	}

	.tasks::-webkit-scrollbar-thumb {
		background-color: #6c63ff;
		border-radius: 10px;
		border: 3px solid #f0f0f0;
	}

	.tasks::-webkit-scrollbar-thumb:hover {
		background-color: #5a4bf0;
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100%;
	}
	.empty h2 {
		text-align: center;
		font-weight: normal;
	}

	@media (min-width: 320px) and (max-width: 480px) {
		.tasks {
			width: 90%;
		}
	}
</style>
