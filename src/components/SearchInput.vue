<script lang="ts" >
  import {ref} from "vue";

  export default {
    name: "SearchInput",
  }
</script>

<template>
  <div class="search-input">
    <input placeholder="Search note..."/>
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
</style>
