<template>
	<div class="task-item">
		<div @click="onChangeActive(task)" class="task-item-content">
			<div class="custom-checkbox" :class="{ active: props.task.done || isActive }" />
			<p :class="{ active: props.task.done || isActive }">{{ props.task.task }}</p>
		</div>
		<div class="task-item-func">
			<button @click="openEditModal" class="task-item-button pencil-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
					/>
				</svg>
			</button>
			<button @click="onDeleteTask" class="task-item-button trash-icon">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="size-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
					/>
				</svg>
			</button>
		</div>
		<TaskModal
			title="EDIT NOTE"
			btn="SAVE"
			:initialTask="props.task"
			v-if="isEditShow"
			@close="isEditShow = false"
			@submit="handleEdit"
		/>
	</div>
</template>

<script setup lang="ts">
	import { ref, inject } from 'vue';
	import { TaskModal } from './index.ts';

	const props = defineProps<{ task: { id: string; task: string; done: boolean } }>();

	const isActive = ref(props.task.done);
	const isEditShow = ref(false);

	const editTask = inject<(task: { id: string; task: string; done: boolean }) => void>('editTask');
	const deleteTask =
		inject<(task: { id: string; task: string; done: boolean }) => void>('deleteTask');
	const doneTask = inject<(task: { id: string; task: string; done: boolean }) => void>('doneTask');

	function onChangeActive(task: { id: string; task: string; done: boolean }) {
		if (doneTask) doneTask({ ...task, done: !task.done });
		isActive.value = !isActive.value;
	}

	function handleEdit(task: { id: string; task: string; done: boolean }) {
		if (editTask) editTask(task);
		isEditShow.value = false;
	}

	const onDeleteTask = () => deleteTask && deleteTask(props.task);

	const openEditModal = () => (isEditShow.value = true);
</script>

<style scoped>
	.task-item {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.task-item-content {
		display: flex;
		align-items: center;
		cursor: pointer;
		gap: 16px;
	}
	.task-item-content p {
		font-size: 20px;
	}
	.task-item-content p.active {
		text-decoration: line-through;
	}
	.task-item-func {
		display: flex;
		gap: 16px;
	}
	.task-item-button {
		cursor: pointer;
		width: 30px;
		height: 30px;
		background-color: transparent;
		border: none;
		color: #cdcdcd;
		transition: 0.3s ease-in-out;
	}
	.trash-icon:hover {
		color: red;
		transform: scale(1.05);
	}
	.pencil-icon:hover {
		color: #6c63ff;
		transform: scale(1.05);
	}
	.task-item-button img {
		width: 100%;
		height: 100%;
	}
	.custom-checkbox {
		width: 30px;
		height: 30px;
		border-radius: 2px;
		border: 2px solid #6c63ff;
		transition: 0.3s ease, 0.3s ease;
	}
	.custom-checkbox.active {
		background-color: #6c63ff;
		transform: scale(1.05);
	}
</style>
