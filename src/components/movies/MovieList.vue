<script setup lang="ts">
import Center from "../common/Center.vue";
import Loading from "../common/Loading.vue";
import MovieCard from "./MovieCard.vue";
import type { Movie } from "@/types/movie";

const props = defineProps<{
  movies: Movie[] | undefined;
  isPending: boolean;
  isError: boolean;
  error: any;
}>();
</script>

<template>
  <div>
    <div v-if="isPending">
      <Center>
        <Loading />
      </Center>
    </div>
    <div v-else-if="isError">Error: {{ error?.message }}</div>
    <div v-else-if="movies && movies.length === 0">No movies found</div>
    <div
      v-else
      class="grid gap-6 grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </div>
  </div>
</template>
