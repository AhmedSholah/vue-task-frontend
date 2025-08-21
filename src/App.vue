<script setup lang="ts">
import Header from "./components/layout/Header.vue";
import MovieList from "./components/movies/MovieList.vue";
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <div class="container">
      <MovieList />
    </div>
  </main>
</template>

<style scoped>
main {
  background-color: #131821;
  min-height: 100vh;
}
header {
  background-color: #131821;
}
</style>
