<script setup lang="ts" >
  const emit = defineEmits<{ (e: 'search', value: string): void }>();

  function searchValueHandler(e: Event) {
    const target = e.target as HTMLInputElement;
    emit('search', target.value);
  }
</script>

<template>
  <div class="search-input">
    <input @input="searchValueHandler" placeholder="Search note..."/>
    <img src="../assets/search-icon.svg" alt="search-icon">
  </div>
</template>

<style scoped>
  .search-input {
    position: relative;
  }
  .search-input input{
    width: 595px;
    padding: 9px 16px;
    border: 1px solid #6C63FF;
    border-radius: 5px;
    font-size: 16px;
  }
  .search-input img {
    width: 21px;
    position: absolute;
    right: 16px;
    top: 12px;
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .search-input {
      display: none;
    }
  }
</style>
