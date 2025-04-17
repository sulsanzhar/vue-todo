<script setup lang="ts">
  import NotesManager from './views/NotesManager.vue';
  import Tasks from "./views/Tasks.vue";
  import OnPlusButton from "./components/OnPlusButton.vue";
  import {ref} from "vue";

  const tasks = ref<{ id: number; text: string }[]>([])

  function onSubmitHandler(newTask: {id: number; text: string}) {
    tasks.value.push(newTask)
  }

</script>

<template>
  <div class="app-container">
    <h1 class="main-text">TODO LIST</h1>
    <NotesManager />
    <Tasks :tasks="tasks"/>
    <OnPlusButton @submit="onSubmitHandler" />
  </div>
</template>

<style scoped>
  .app-container {
    width: 750px;
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
