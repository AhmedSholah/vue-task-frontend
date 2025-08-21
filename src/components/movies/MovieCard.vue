<script setup lang="ts">
import type { Movie } from "@/types/movie";
import IconStar from "../icons/IconStar.vue";
import { ref, watch } from "vue";

defineProps<{ movie: Movie }>();

const value = ref<number>(0);

watch(value, (newVal, oldVal) => {
  console.log("value changed:", oldVal, "→", newVal);
});
</script>

<template>
  <a-card hoverable class="w-fit max-w-1/2">
    <template #cover>
      <div class="relative">
        <div class="absolute right-1 top-1">
          <span class="relative w-fit h-fit">
            <IconStar class="size-10" />
            <span
              class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-black font-bold"
            >
              {{ movie.rating }}
            </span>
          </span>
        </div>
        <img alt="example" :src="movie.image" />
      </div>
    </template>

    <div class="!font-bold text-2xl">{{ movie.name }}</div>

    <div class="flex flex-wrap gap-2 !my-3">
      <a-badge
        count="Crime"
        :number-style="{ backgroundColor: '#5951dc' }"
        v-for="genre in movie.genres"
        :key="genre"
      />
    </div>

    <div>
      {{ movie.description }}
    </div>

    <div class="flex gap-5 items-center !mt-5">
      <span>Rating: ({{ movie.rating }}/5)</span>
      <a-rate v-model:value="value" />
    </div>
  </a-card>
</template>
