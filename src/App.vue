<template>
  <div class="app-container">
    <h1 class="main-text">TODO LIST</h1>
    <NotesManager />
    <Tasks v-if="!isLoading" />
    <ItemsCount v-if="tasks.length" />
    <OnPlusButton @submit="onSubmitHandler" />
    <Loader v-if="isLoading" />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref, type Reactive, inject, computed, provide, reactive } from "vue";
  import axios from "axios";
  import { ItemsCount, OnPlusButton, Loader } from './components/index.ts';
  import { NotesManager, Tasks } from "./views/index.ts";
  import { findIndex } from "./utils/findIndex.ts";

  const tasks = inject<Reactive<Task[]>>('tasks', reactive<Task[]>([]));
  provide('tasks', tasks);

  const count = computed(() => tasks.length);
  provide('count', count);

  provide('editTask', onEditTask);
  provide('doneTask', onDoneTask);
  provide('deleteTask', onDeleteTask);
  provide('searchTask', onSearchHandler);
  provide('sortTask', onSortHandler);

  const allTasks = ref<Task[]>([]);
  const isLoading = ref(false);
  let currentFilter = ref("All");

  type Task = { id: string; task: string; done: boolean };
  type TasksResponse = Record<string, Task>;

  onMounted(async () => {
    isLoading.value = true;
    try {
      const response = await axios.get<TasksResponse>(
          'https://vue-todo-57da6-default-rtdb.firebaseio.com/todos.json'
      );

      if (response.status === 200 && response.data) {
        const tasksFromDB = Object.entries(response.data).map(([key, task]) => ({
          id: key,
          task: task.task,
          done: task.done,
        }));

        allTasks.value = tasksFromDB;
        tasks.splice(0, tasks.length, ...tasksFromDB);
      } else {
        allTasks.value = [];
        tasks.splice(0, tasks.length);
      }
    } catch (error) {
      console.error("Error while fetching tasks:", error);
      allTasks.value = [];
      tasks.splice(0, tasks.length);
    } finally {
      isLoading.value = false;
    }
  });

  async function onSubmitHandler(newTask: {id: string; task: string; done: boolean }) {
    try {
      const req = axios.post('https://vue-todo-57da6-default-rtdb.firebaseio.com/todos.json', {
        task: newTask.task,
        done: false
      });

      allTasks.value.push(newTask);
      tasks.push(newTask);
      console.log("req: ", await req);
    } catch (e) {
      console.error(e);
    }
  }

  function onDeleteTask(taskToDelete: { id: string; task: string; done: boolean }) {
    axios.delete(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToDelete.id}.json`);
    const index: number = findIndex(tasks, taskToDelete);
    tasks.splice(index, 1);
  }

  function onEditTask(taskToEdit: { id: string; task: string; done: boolean }) {
    axios.put(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToEdit.id}.json`, {
      task: taskToEdit.task,
      done: taskToEdit.done
    }).then(() => {
      const index = findIndex(tasks, taskToEdit);
      if (index !== -1) {
        tasks[index].task = taskToEdit.task;
        tasks[index].done = taskToEdit.done;
      }
    });
  }

  function onDoneTask(taskToDone: { id: string; task: string; done: boolean }) {
    axios.put(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToDone.id}.json`, {
      task: taskToDone.task,
      done: taskToDone.done
    }).then(() => {
      const indexAll = allTasks.value.findIndex(t => t.id === taskToDone.id);
      if (indexAll !== -1) {
        allTasks.value[indexAll] = { ...taskToDone };
      }

      onSortHandler(currentFilter.value);
    });
  }

  function onSortHandler(option: string) {
    currentFilter.value = option;

    const arr = [...allTasks.value];
    let filtered: Task[] = [];

    switch (option) {
      case "All":
        filtered = arr;
        break;
      case "Completed":
        filtered = arr.filter(item => item.done === true);
        break;
      case "In Progress":
        filtered = arr.filter(item => item.done === false);
        break;
    }

    tasks.length = 0;
    tasks.push(...filtered);
  }

  function onSearchHandler(value: string) {
    const arr = [...allTasks.value];
    const filtered = arr.filter(item =>
        item.task.toLowerCase().includes(value.toLowerCase())
    );

    tasks.length = 0;
    tasks.push(...filtered);
  }


</script>

<style scoped>
  .app-container {
    width: 815px;
    margin: 50px auto 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 18px;
  }
  .main-text {
    font-size: 26px;
    color: #252525;
    font-weight: initial;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .app-container {
      width: 100%;
    }
  }
</style>
