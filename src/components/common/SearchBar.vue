<template>
  <div
    class="rounded-lg border border-gray-700 bg-gray-800/50 p-4 flex flex-wrap items-center gap-5 !mb-6"
  >
    <!-- Search -->
    <a-input
      v-model:value="searchQuery"
      placeholder="Search..."
      style="width: 200px"
    >
      <template #prefix>
        <SearchOutlined />
      </template>
    </a-input>

    <!-- Filters -->
    <!-- Genres multi-select -->
    <a-select
      v-model:value="selectedGenres"
      mode="multiple"
      style="width: fit-content; min-width: 200px"
      placeholder="select genere"
    >
      <a-select-option value="drama">Drama</a-select-option>
      <a-select-option value="crime">Crime</a-select-option>
      <a-select-option value="action">Action</a-select-option>
      <a-select-option value="comedy">Comedy</a-select-option>
    </a-select>

    <!-- In theaters toggle -->
    <!-- <a-checkbox
      v-model:checked="inTheatersOnly"
      class="!text-white flex !justify-center !items-center"
      >In theaters</a-checkbox
    > -->
    <a-switch
      v-model:checked="inTheatersOnly"
      checked-children="In Theaters Only"
      un-checked-children="All Movies"
    />
  </div>
</template>

<script setup lang="ts">
import { SearchOutlined } from "@ant-design/icons-vue";
import { ref, watch, watchEffect } from "vue";

const emit = defineEmits<{
  (e: "filters-change", payload: { query: string }): void;
}>();

const searchQuery = ref<string>("");
const selectedGenres = ref<string[]>([]);
const inTheatersOnly = ref<boolean>(false);

// Debounce search input (300ms)
let t: ReturnType<typeof setTimeout> | undefined;
const debounceTimeout = 300;

function buildQuery(q: string, genres: string[], inTheaters: boolean) {
  const params = new URLSearchParams();

  if (q.trim()) {
    params.append("q", q.trim());
  }

  genres.forEach((g) => {
    params.append("genres_like", g);
  });

  if (inTheaters) {
    params.append("inTheaters", "true");
  }

  emit("filters-change", { query: params.toString() });
  console.log("Query:", params.toString());
}

// 🔹 Debounce search only
watch(searchQuery, (q) => {
  if (t) clearTimeout(t);
  t = setTimeout(() => {
    buildQuery(q, selectedGenres.value, inTheatersOnly.value);
  }, debounceTimeout);
});

// 🔹 Immediate updates for genres and inTheaters
watch([selectedGenres, inTheatersOnly], ([genres, inTheaters]) => {
  buildQuery(searchQuery.value, genres, inTheaters);
});
</script>
