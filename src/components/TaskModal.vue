<template>
  <div class="task-modal-bg">
    <div class="task-modal">
      <div>
        <h2>NEW NOTE</h2>
        <input v-model="task" placeholder="Input your note..." type="text">
      </div>
      <div class="task-modal-func">
        <button @click="$emit('close')" class="cancel-btn">CANCEL</button>
        <button @click="submit" class="apply-btn">APPLY</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'TaskModal',
    emits: ['close', 'submit'],
    data() {
      return {
        task: '',
      }
    },
    methods: {
      submit() {
        if (this.task.trim()) {
          this.$emit('submit', {
            id: Date.now(),
            text: this.task.trim()
          });
          this.$emit('close');
          this.task = "";
        }
      }
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
</style>