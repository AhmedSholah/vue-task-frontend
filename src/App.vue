<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { movieService } from "./api/services/movieService";
import Header from "./components/layout/Header.vue";
import MovieList from "./components/movies/MovieList.vue";
import type { Movie } from "./types/movie";
import SearchBar from "./components/common/SearchBar.vue";

const {
  isPending,
  isError,
  data: movies,
  error,
} = useQuery<Movie[]>({
  queryKey: ["movies"],
  queryFn: movieService.getMovies,
});
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <div class="container">
      <SearchBar />
      <MovieList
        :movies="movies"
        :is-pending="isPending"
        :is-error="isError"
        :error="error"
      />
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
