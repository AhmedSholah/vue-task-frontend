<script setup lang="ts">
import type { Movie } from "@/types/movie";
import { ref, watch, createVNode, reactive } from "vue";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { queryClient } from "@/lib/queryClient";
import { movieService } from "@/api/services/movieService";
import {
  DeleteFilled,
  EditFilled,
  StarFilled,
  ExclamationCircleOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
import AddMovieModal from "./MovieModal.vue";

const props = defineProps<{ movie: Movie }>();

const value = ref<number>(props.movie.rating || 0);

const updateMovie = useMutation({
  mutationFn: movieService.updateMovie,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
  },
});

const deleteMovie = useMutation({
  mutationFn: (id: string) => movieService.deleteMovie(id),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
  },
});

watch(value, (newVal, oldVal) => {
  updateMovie.mutate({ ...props.movie, rating: newVal });
});

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;
  img.src =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcxvROcJNSUzCzBx7Bncr5KUkZ_fLmznFf_A&s";
};

const handleEdit = () => {
  showEditModal(props.movie.id);
};

const handleDelete = () => {
  Modal.confirm({
    title: "Delete this movie?",
    icon: createVNode(ExclamationCircleOutlined),
    content: `This action cannot be undone.`,
    okText: "Delete",
    okType: "danger",
    cancelText: "Cancel",
    onOk: () => deleteMovie.mutateAsync(String(props.movie.id)),
  });
};

const isModalVisible = ref(false);

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

const showEditModal = (movieId: number | undefined) => {
  isModalVisible.value = true;
  Object.assign(formState, props.movie);
};

const onFinish = (values: Movie) => {
  const payload = { ...values, id: props.movie.id, rating: props.movie.rating };
  updateMovie.mutate(payload);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleCancel = () => {
  isModalVisible.value = false;
  resetForm();
};
</script>

<template>
  <a-card class="w-full relative group">
    <template #cover>
      <div class="relative">
        <div class="absolute right-2 top-2 w-fit h-fit">
          <StarFilled
            :style="{
              color: movie.rating ? '#ffd600' : '#9ca3af',
              fontSize: '48px',
            }"
            class="transition"
          />
          <span
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-sm"
          >
            {{ movie.rating || "-" }}
          </span>
        </div>

        <img
          alt="movie image"
          :src="movie.image"
          @error="handleImageError"
          class="w-full h-full object-cover"
        />
      </div>
    </template>

    <div class="!font-bold text-2xl">{{ movie.name }}</div>

    <div class="flex flex-wrap gap-2 !my-3">
      <a-badge
        v-for="genre in movie.genres"
        :count="genre"
        :number-style="{ backgroundColor: '#5951dc' }"
        :key="genre"
      />
    </div>

    <div>
      {{ movie.description }}
    </div>

    <div class="flex gap-1 items-center !mt-5">
      <span>Rating: ({{ movie.rating || "-" }}/5)</span>
      <a-rate v-model:value="value" />
    </div>
    <div
      class="absolute bottom-5 right-5 flex gap-2 items-center !mt-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
    >
      <a-button
        type="text"
        @click="handleEdit"
        class="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center p-0 border-0 shadow-sm"
      >
        <EditFilled class="text-black text-lg" />
      </a-button>
      <a-button
        type="text"
        @click="handleDelete"
        class="w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center p-0 border-0 shadow-sm"
      >
        <DeleteFilled class="text-black text-lg" />
      </a-button>
    </div>
  </a-card>

  <AddMovieModal
    :opened="isModalVisible"
    :form-state="formState"
    :handle-cancel="handleCancel"
    :onFinish="onFinish"
    :onFinishFailed="onFinishFailed"
  />
</template>
