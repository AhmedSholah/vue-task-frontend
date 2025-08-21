<template>
  <div class="flex justify-center !mt-6">
    <a-pagination
      v-model:current="currentPage"
      :total="500"
      show-less-items
      :show-size-changer="false"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
const emit = defineEmits<{
  (e: "page-change", page: number): void;
}>();

const currentPage = ref(1);

watch(currentPage, (page) => {
  emit("page-change", page);
});
</script>

<style scoped>
/* Normal page numbers */
:deep(.ant-pagination-item a) {
  color: white !important;
}

/* Active page */
:deep(.ant-pagination-item-active) {
  background-color: #1677ff;
  border-color: #1677ff;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}

/* Prev / Next arrows */
:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link) {
  color: white !important;
  background-color: transparent;
  border-color: #1677ff; /* optional */
}

/* Jump arrows (<< >> for skipping pages) */
:deep(.ant-pagination-jump-prev .ant-pagination-item-link),
:deep(.ant-pagination-jump-next .ant-pagination-item-link) {
  color: white !important;
  background-color: transparent;
}

/* Double-arrow icons inside jump buttons */
:deep(.ant-pagination-item-link-icon) {
  color: white !important;
}

/* Ellipsis (…) inside jump buttons */
:deep(.ant-pagination-item-ellipsis) {
  color: white !important;
}
</style>
