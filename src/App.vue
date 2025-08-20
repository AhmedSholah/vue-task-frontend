<script setup lang="ts">
import Header from "./components/Header/Header.vue";
import IconStar from "./components/icons/IconStar.vue";
import MovieCard from "./components/MovieCard.vue";
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <div class="container">
      <MovieCard />
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
