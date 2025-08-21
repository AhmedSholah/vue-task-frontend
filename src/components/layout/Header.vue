<template>
  <div class="container flex justify-between">
    <div>
      Total Movies: {{ totalMovies }} / Average rating:
      {{ averageRating }}
    </div>
    <a-button type="primary" @click="showModal"> Add New Movie </a-button>
  </div>
  <AddMovieModal
    :opened="isModalVisible"
    :form-state="formState"
    :handle-cancel="handleCancel"
    :onFinish="onFinish"
    :onFinishFailed="onFinishFailed"
  />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import AddMovieModal from "../movies/MovieModal.vue";
import { ref, reactive } from "vue";
import { queryClient } from "@/lib/queryClient";
import axios from "axios";
import type { Movie } from "@/types/movie";
import { movieService } from "@/api/services/movieService";

const isModalVisible = ref(false);

const isLoading = ref(false);

async function postMovie(values: Movie) {
  const res = await axios.post("http://localhost:8080/items", values);
  return res.data;
}

const {
  isPending: isAveragePending,
  isError: isAverageError,
  data: averageRating,
  error: averageError,
} = useQuery({
  queryKey: ["averageRating"],
  queryFn: movieService.getMoviesAverageRating,
});

const {
  isPending: isCountPending,
  isError: isCountError,
  data: totalMovies,
  error: countError,
} = useQuery({
  queryKey: ["totalMovies"],
  queryFn: movieService.getMoviesCount,
});

const mutation = useMutation({
  mutationFn: movieService.createMovie,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
  },
});

const formState = reactive<Movie>({
  name: "",
  description: "",
  image: "",
  genres: [],
  inTheaters: false,
  rating: 0,
});

const resetForm = () => {
  formState.name = "";
  formState.description = "";
  formState.image = "";
  formState.genres = [];
  formState.inTheaters = false;
  formState.rating = 0;
};

const showModal = () => {
  isModalVisible.value = true;
};

const onFinish = (values: Movie) => {
  const payload = { ...values, rating: null };
  console.log("Success (final payload):", payload);
  mutation.mutate(payload);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleCancel = () => {
  isModalVisible.value = false;
  resetForm();
};
</script>
