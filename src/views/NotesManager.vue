<template>
  <div class="NotesManager">
    <SearchInput @search="onSearchHandler"/>
    <SortButton @sort="onSortHandler"/>
    <ChangeThemeButton />
  </div>
</template>

<script setup lang="ts">
  import SearchInput from "../components/SearchInput.vue";
  import SortButton from "../components/SortButton.vue";
  import ChangeThemeButton from "../components/ChangeThemeButton.vue";

  const emit = defineEmits<{
    (e: 'sort', option: string): void;
    (e: 'search', value: string): void;
  }>();

  function onSortHandler(option: string) {
    emit('sort', option);
  }

  function onSearchHandler(value: string) {
    emit('search', value.toLowerCase());
  }
</script>

<style  scoped>
  .NotesManager {
    display: flex;
    margin-top: 30px;
    gap: 16px;
  }
</style>