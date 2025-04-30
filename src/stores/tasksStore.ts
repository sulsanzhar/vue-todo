import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

type Task = { id: string; task: string; done: boolean };

export const useTasksStore = defineStore('tasks', () => {
	const tasks = ref<Task[]>([]);

	const tasksCount = computed(() => tasks.value.length);

	function addTask(newTask: Task) {
		tasks.value.push(newTask);
	}

	function deleteTask(id: string) {
		tasks.value = tasks.value.filter((task) => task.id !== id);
	}

	function editTask(updatedTask: Task) {
		const index = tasks.value.findIndex((task) => task.id === updatedTask.id);
		if (index !== -1) {
			tasks.value[index] = updatedTask;
		}
	}

	function toggleTaskDone(id: string) {
		const task = tasks.value.find((task) => task.id === id);
		if (task) {
			task.done = !task.done;
		}
	}

	return {
		tasks,
		tasksCount,
		addTask,
		deleteTask,
		editTask,
		toggleTaskDone,
	};
});
