<template>
  <div
    class="container flex flex-col items-center gap-5 md:flex-row md:justify-between !py-12"
  >
    <div>
      Total Movies: {{ totalMovies }} / Average rating:
      {{ averageRating }}
    </div>
    <div class="flex gap-3">
      <a-button type="primary" @click="showRemoveRatingsModal">
        Remove Ratings
      </a-button>
      <a-button type="primary" @click="showAddMovieModal">
        Add New Movie
      </a-button>
    </div>
  </div>

  <!-- Remove Ratings Confirm Modal -->
  <a-modal
    v-model:open="isRemoveRatingsModalVisible"
    title="Confirm Remove All Ratings"
    :confirm-loading="isRemovingRatings"
    @ok="confirmRemoveRatings"
    @cancel="cancelRemoveRatings"
  >
    <p>
      Are you sure you want to remove all ratings from all movies? This action
      cannot be undone.
    </p>
  </a-modal>

  <!-- Add Movie Modal -->
  <MovieModal
    :opened="isModalVisible"
    type="add"
    :isLoading="isLoading"
    :form-state="formState"
    :handle-cancel="handleCancel"
    :onFinish="onFinish"
    :onFinishFailed="onFinishFailed"
  />
</template>

<script setup lang="ts">
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, reactive, computed } from "vue";
import { queryClient } from "@/lib/queryClient";
import type { Movie } from "@/types/movie";
import { movieService } from "@/api/services/movieService";
import MovieModal from "../movies/MovieModal.vue";
import {
  showErrorNotification,
  showSuccessNotification,
} from "@/utils/notifications";

const isModalVisible = ref(false);
const isRemoveRatingsModalVisible = ref(false);
const isRemovingRatings = ref(false);
const isLoading = ref(false);

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

const createMovie = useMutation({
  mutationFn: movieService.createMovie,
  onMutate: () => {
    isLoading.value = true;
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
  },
});

const removeRatingsMutation = useMutation({
  mutationFn: movieService.removeAllRatings,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["movies"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies"] });
    queryClient.invalidateQueries({ queryKey: ["averageRating"] });
    queryClient.invalidateQueries({ queryKey: ["totalMovies", ""] });
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
  formState.description = "";
  formState.image = "";
  formState.genres = [];
  formState.inTheaters = false;
  formState.rating = 0;
};

const showAddMovieModal = () => {
  isModalVisible.value = true;
};

const showRemoveRatingsModal = () => {
  isRemoveRatingsModalVisible.value = true;
};

const confirmRemoveRatings = async () => {
  isRemovingRatings.value = true;
  try {
    await removeRatingsMutation.mutateAsync();
    isRemoveRatingsModalVisible.value = false;
  } catch (error) {
    console.error("Failed to remove ratings:", error);
  } finally {
    isRemovingRatings.value = false;
  }
};

const cancelRemoveRatings = () => {
  isRemoveRatingsModalVisible.value = false;
};

const onFinish = async (values: Movie) => {
  const payload = { ...values, rating: null };
  console.log("Success (final payload):", payload);
  await createMovie.mutateAsync(payload);
  handleCancel();
  showSuccessNotification(
    "Movie Added Successfully",
    "The movie has been added to your collection."
  );
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
  showErrorNotification(
    "Failed to Add Movie",
    "There was an error adding the movie to your collection. Please try again."
  );
};

const handleCancel = () => {
  isModalVisible.value = false;
  isLoading.value = false;
  resetForm();
};
</script>
