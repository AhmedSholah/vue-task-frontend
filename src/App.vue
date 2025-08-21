<script setup lang="ts">
import { useQuery } from "@tanstack/vue-query";
import { movieService } from "./api/services/movieService";
import Header from "./components/layout/Header.vue";
import MovieList from "./components/movies/MovieList.vue";
import type { Movie } from "./types/movie";
import SearchBar from "./components/common/SearchBar.vue";
import { ref } from "vue";
import { queryClient } from "./lib/queryClient";
import Pagination from "./components/common/Pagination.vue";

const currentPage = ref<string>("0");
const currentFilters = ref<string>("");

const {
  isPending,
  isError,
  data: movies,
  error,
} = useQuery<Movie[]>({
  queryKey: ["movies", currentFilters, currentPage],
  queryFn: () =>
    movieService.getMovies(currentFilters.value, currentPage.value),
  refetchOnWindowFocus: false,
});

const handleFiltersChange = (payload: { query: string }) => {
  currentFilters.value = payload.query;
  queryClient.invalidateQueries({ queryKey: ["movies"] });
};

const handlePageChange = (page: string) => {
  currentPage.value = page;
  queryClient.invalidateQueries({ queryKey: ["movies"] });
};
</script>

<template>
  <header>
    <Header />
  </header>
  <main>
    <div class="container">
      <SearchBar @filters-change="handleFiltersChange" />
      <MovieList
        :movies="movies"
        :isPending="isPending"
        :isError="isError"
        :error="error"
      />
      <Pagination @page-change="handlePageChange" />
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
