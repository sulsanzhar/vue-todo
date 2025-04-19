<template>
  <ul class="tasks">
    <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
    />
    <div v-if="!tasks.length" class="empty">
    <img src="../../public/detective.png" alt="detective-image">
      <h2>Empty...</h2>
    </div>
  </ul>
</template>

<script setup lang="ts">
  import { TaskItem } from "../components/index.ts";
  import { inject } from 'vue';

  const tasks = inject<{ id: string; task: string; done: boolean }[]>("tasks", []);
</script>

<style scoped>
  .tasks {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 34px;
    width: 700px;
  }
  .empty {
    margin: 0 auto;
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