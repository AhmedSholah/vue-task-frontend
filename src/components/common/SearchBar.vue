<template>
  <div class="w-full rounded-lg border border-gray-700 bg-gray-800/50 p-4">
    <!-- Search -->
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search movies..."
        class="w-full rounded-md border border-gray-600 bg-gray-900/60 px-10 py-2 text-gray-100 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
      <span
        class="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400"
      >
        <!-- simple magnifier -->
        <svg
          class="h-5 w-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-4.35-4.35m1.1-4.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z"
          />
        </svg>
      </span>
    </div>

    <!-- Filters -->
    <div class="mt-4 flex flex-wrap items-center gap-4">
      <!-- Genres multi-select -->
      <select
        v-model="selectedGenres"
        multiple
        class="min-w-[220px] max-w-full rounded-md border border-gray-600 bg-gray-900/60 px-3 py-2 text-gray-100 outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      >
        <option value="drama">Drama</option>
        <option value="crime">Crime</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="thriller">Thriller</option>
        <option value="romance">Romance</option>
        <option value="sci-fi">Sci‑Fi</option>
        <option value="horror">Horror</option>
      </select>

      <!-- In theaters toggle -->
      <label class="inline-flex items-center gap-2 text-gray-200">
        <input
          type="checkbox"
          v-model="inTheatersOnly"
          class="h-4 w-4 rounded border-gray-600 bg-gray-900 text-indigo-500 focus:ring-indigo-500"
        />
        <span>In theaters only</span>
      </label>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const emit = defineEmits<{
  (e: "search-change", value: string): void;
  (
    e: "filters-change",
    payload: { genres: string[]; inTheaters: boolean }
  ): void;
}>();

const searchQuery = ref<string>("");
const selectedGenres = ref<string[]>([]);
const inTheatersOnly = ref<boolean>(false);

// Debounce search input (300ms)
let t: number | undefined;
watch(searchQuery, (val) => {
  clearTimeout(t);
  t = window.setTimeout(() => emit("search-change", val.trim()), 300);
});

// Emit filter changes immediately
watch(
  [selectedGenres, inTheatersOnly],
  ([genres, inTheaters]) => {
    emit("filters-change", { genres, inTheaters });
  },
  { deep: true }
);
</script>

<style scoped>
.search-filters-container {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 16px;
}

.search-input {
  margin-bottom: 16px;
}

.filters-row {
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .filters-row {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-row .ant-select {
    min-width: 100% !important;
  }
}
</style>
