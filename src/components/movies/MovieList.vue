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
    <div v-else>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <MovieCard :movie="movie" />
        </li>
      </ul>
    </div>
  </div>
</template>
