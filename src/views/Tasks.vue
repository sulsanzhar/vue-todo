<template>
  <ul class="tasks">
    <TaskItem v-for="task in tasks" :key="task.id" :task="task" />
  </ul>
</template>

<script setup lang="ts">
  import TaskItem from "../components/TaskItem.vue";

  defineProps<{tasks: { id: number; text: string }[] }>();
</script>

<style scoped>
  .tasks {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 34px;
    width: 700px;
  }
</style>