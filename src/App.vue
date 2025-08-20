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
      <div class="grid sm:grid-cols-1 md:grid-cols-2 grid-cols-3 gap-4">
        <MovieCard /><MovieCard /><MovieCard /><MovieCard />
        <div class="relative">
          <IconStar />
          <span class="absolute">5</span>
        </div>
      </div>
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
