<template>
  <button @click="isShow = true" class="on-plus-button">
    <img height="30" width="30" src="../assets/plus-icon.svg" alt="plus-icon">
  </button>
  <TaskModal
      v-if="isShow"
      @close="isShow = false"
      @submit="handleApply"
      title="NEW NOTE"
      btn="APPLY"
  />
</template>

<script setup lang="ts">
  import { ref } from "vue";
  import { TaskModal } from './index.ts'

  const emit = defineEmits(['submit']);
  const isShow = ref(false);

  function handleApply(task: { id: string; task: string; done: boolean }): void {
    emit('submit', task);
    isShow.value = false;
}
</script>

<style scoped>
  .on-plus-button {
    position: absolute;
    width: 50px;
    height: 50px;
    bottom: 50px;
    right: 50px;
    background-color: #6C63FF;
    box-shadow: 0px 0px 4px 0px #6C63FF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
  }
</style>