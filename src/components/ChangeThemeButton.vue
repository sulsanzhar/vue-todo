<template>
  <button class="change-theme-button">
    <img src="../assets/night-icon.svg" alt="night-icon">
  </button>
</template>

<script lang="ts">
  export default {
    name: "ChangeThemeButton",
  }
</script>

<style>
  .change-theme-button {
    width: 38px;
    background-color: #6C63FF;
    border: none;
    border-radius: 5px;
    display: flex;
    align-items: center;
  }
  .change-theme-button img {
    padding: 8px;
  }
</style>