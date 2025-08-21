<template>
  <div class="container flex justify-between">
    <div>Total Movies: 3 / Average rating:3.7</div>
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
import { useMutation } from "@tanstack/vue-query";
import AddMovieModal from "../movies/AddMovieModal.vue";
import { ref, reactive } from "vue";
import { queryClient } from "@/lib/queryClient";
import axios from "axios";
import type { Movie } from "@/types/movie";

const isModalVisible = ref(false);

const isLoading = ref(false);

async function postMovie(values: Movie) {
  const res = await axios.post("http://localhost:8080/items", values);
  return res.data;
}

const mutation = useMutation({
  mutationFn: postMovie,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
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
