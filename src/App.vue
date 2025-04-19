<script setup lang="ts">
  import NotesManager from './views/NotesManager.vue';
  import Tasks from "./views/Tasks.vue";
  import OnPlusButton from "./components/OnPlusButton.vue";
  import {onMounted, ref} from "vue";
  import axios from "axios";
  import Loader from "./components/Loader.vue";
  import ItemsCount from "./components/ItemsCount.vue";

  const tasks = ref<Task[]>([])
  const allTasks = ref<Task[]>([]);
  const isLoading = ref(false);

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
        tasks.value = tasksFromDB;
      } else {
        allTasks.value = [];
        tasks.value = [];
      }
    } catch (error) {
      console.error("Error while fetching tasks:", error);
      allTasks.value = [];
      tasks.value = [];
    } finally {
      isLoading.value = false;
    }
  });

  async function onSubmitHandler(newTask: {id: string; task: string; done: boolean }) {
    tasks.value.push(newTask);

    try {
      const req = axios.post('https://vue-todo-57da6-default-rtdb.firebaseio.com/todos.json', {
        task: newTask.task,
        done: false
      });
      console.log("req: ", await req);
    } catch (e) {
      console.error(e);
    }
  }

  function onDeleteTask(taskToDelete: { id: string; task: string; done: boolean }) {
    axios.delete(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToDelete.id}.json`)
  }

  function onEditTask(taskToEdit: { id: string; task: string; done: boolean }) {
    axios.put(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToEdit.id}.json`, {
      task: taskToEdit.task,
      done: taskToEdit.done
    }).then(() => {
      const index = tasks.value.findIndex(task => task.id === taskToEdit.id);
      if (index !== -1) {
        tasks.value[index].task = taskToEdit.task;
      }
    });
  }

  function onDoneTask(taskToDone: { id: string; task: string; done: boolean }) {
    axios.put(`https://vue-todo-57da6-default-rtdb.firebaseio.com/todos/${taskToDone.id}.json`, {
      task: taskToDone.task,
      done: taskToDone.done
    }).then(() => {
      const index = tasks.value.findIndex(task => task.id === taskToDone.id);
      if (index !== -1) {
        tasks.value[index].task = taskToDone.task;
      }
    });
  }

  function onSortHandler(option: string) {
    const arr = [...allTasks.value];

    switch (option) {
      case "All":
        tasks.value = arr;
        break;
      case "Completed":
        tasks.value = arr.filter(item => item.done === true);
        break;
      case "In Progress":
        tasks.value = arr.filter(item => item.done === false);
        break;
    }
  }

  function onSearchHandler(value: string) {
    const arr = [...allTasks.value];

    console.log("value from app.vue: ", value)

    tasks.value = arr.filter(item => item.task.toLowerCase().includes(value))
  }

</script>

<template>
  <div class="app-container">
    <h1 class="main-text">TODO LIST</h1>
    <NotesManager @sort="onSortHandler" @search="onSearchHandler"/>
    <Tasks
        v-if="!isLoading"
        :tasks="tasks"
        @delete="onDeleteTask"
        @edit="onEditTask"
        @done="onDoneTask"
    />
    <ItemsCount v-if="tasks.length" :count="tasks.length"/>
    <OnPlusButton @submit="onSubmitHandler" />
    <Loader v-if="isLoading" />
  </div>
</template>

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
</style>
