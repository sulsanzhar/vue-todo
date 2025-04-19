<template>
  <ul class="tasks">
    <TaskItem
        v-for="task in tasks"
        :key="task.id" :task="task"
        @delete="onDelete"
        @edit="onEdit"
        @done="onDone"

    />
    <div v-if="!tasks.length" class="empty">
    <img src="../../public/detective.png" alt="detective-image">
      <h2>Empty...</h2>
    </div>
  </ul>
</template>

<script setup lang="ts">
  import TaskItem from "../components/TaskItem.vue";

  const emit = defineEmits<{
    (e: 'delete', task: { id: string; task: string; done: boolean }): void;
    (e: 'edit', task: { id: string; task: string; done: boolean }): void;
    (e: 'done', task: { id: string; task: string; done: boolean }): void;
  }>();

  defineProps<{ tasks: { id: string; task: string; done: boolean }[] }>();

  function onDelete(task: { id: string; task: string; done: boolean }) {
    emit('delete', task); // пробрасываем вверх
  }

  function onEdit(task: { id: string; task: string; done: boolean }) {
    emit('edit', task);
  }

  function onDone(task: { id: string; task: string; done: boolean }) {
    emit('done', task);
  }
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