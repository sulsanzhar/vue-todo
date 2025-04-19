<template>
  <div class="task-modal-bg">
    <form @submit.prevent="submit" class="task-modal">
      <div>
        <h2>{{ title }}</h2>
        <input
            v-model="task"
            placeholder="Input your note..." type="text"
        >
      </div>
      <div class="task-modal-func">
        <button type="button" @click="$emit('close')" class="cancel-btn">CANCEL</button>
        <button type="submit" class="apply-btn">{{ btn }}</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue';

  const props = defineProps<{
    title: string;
    btn: string;
    initialTask?: {
      id: string;
      task: string;
      done?: boolean;
    };
  }>();

  const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'submit', payload: { id: string; task: string; done: boolean }): void;
  }>();

  const task = ref(props.initialTask?.task ?? '');

  watch(() => props.initialTask, (newVal) => {
    task.value = newVal?.task ?? '';
  });

  function submit() {
    if (task.value.trim()) {
      emit('submit', {
        id: props.initialTask?.id ?? '',
        task: task.value.trim(),
        done: props.initialTask?.done ?? false,
      });
      emit('close');
      task.value = '';
    }
  }
</script>

<style scoped>
  .task-modal-bg {
    position: absolute;
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(37, 37, 37, 0.7);
  }
  .task-modal {
    position: absolute;
    z-index: 100;
    padding: 18px 30px;
    border-radius: 16px;
    background-color: white;
    width: 500px;
    transform: translate(-50%, -50%);
    left: 50%;
    top: 50%;
  }
  .task-modal h2 {
    text-align: center;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 25px;
  }
  .task-modal input {
    margin-bottom: 128px;
    width: 100%;
    border-radius: 5px;
    padding: 11px 16px;
    border: 1px solid #6C63FF;
  }
  .task-modal-func {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .task-modal button{
    padding: 10px 22px;
    border-radius: 5px;
    cursor: pointer;
  }
  .cancel-btn {
    color: #6C63FF;
    border: 1px solid #6C63FF;
    background-color: transparent;
  }
  .apply-btn {
    color: white;
    background-color: #6C63FF;
    border-color: transparent;
  }

  @media (min-width: 320px ) and (max-width: 500px) {
    .task-modal {
      width: 90%;
    }
  }
</style>