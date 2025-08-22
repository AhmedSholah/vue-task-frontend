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

const currentPage = ref<number>(1);
const currentFilters = ref<string>("");

const { data: totalMovies } = useQuery({
  queryKey: ["totalMovies", currentFilters],
  queryFn: () => movieService.getFilteredMoviesCount(currentFilters.value),
});

const {
  isPending,
  isError,
  data: movies,
  error,
} = useQuery<Movie[]>({
  queryKey: ["movies", currentPage, currentFilters],
  queryFn: () =>
    movieService.getMovies(currentPage.value, currentFilters.value),
  refetchOnWindowFocus: false,
});

const handleFiltersChange = (payload: { query: string }) => {
  currentFilters.value = payload.query;
  currentPage.value = 1;
  queryClient.invalidateQueries({ queryKey: ["movies"] });
  queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
};

const handlePageChange = (page: number) => {
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
      <Pagination
        @page-change="handlePageChange"
        :total="totalMovies || 0"
        v-model:current="currentPage"
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
