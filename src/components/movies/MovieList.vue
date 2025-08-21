<script setup lang="ts">
import { movieService } from "@/api/services/movieService";
import type { Movie } from "@/types/movie";
import { useQuery } from "@tanstack/vue-query";
import MovieCard from "./MovieCard.vue";

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
  <div>
    <div v-if="isPending">Loading...</div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <MovieCard :movie="movie" />
        </li>
      </ul>
    </div>
  </div>
</template>
