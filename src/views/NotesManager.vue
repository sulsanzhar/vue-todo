<template>
  <div class="NotesManager">
    <SearchInput />
    <SortButton />
    <ChangeThemeButton />
  </div>
</template>

<script lang="ts">
  import SearchInput from "../components/SearchInput.vue";
  import SortButton from "../components/SortButton.vue";
  import ChangeThemeButton from "../components/ChangeThemeButton.vue";

  export default {
    name: 'NotesManager',
    components: {ChangeThemeButton, SortButton, SearchInput }
  };
</script>

<style  scoped>
  .NotesManager {
    display: flex;
    gap: 16px;
  }
</style>