<template>
  <div class="flex justify-center !mt-6">
    <a-pagination
      v-model:current="currentPage"
      :total="total"
      :page-size="3"
      show-less-items
      :show-size-changer="false"
      @change="handlePageChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const props = defineProps<{
  total: number;
  current: number;
}>();

const emit = defineEmits<{
  (e: "page-change", page: number): void;
  (e: "update:current", page: number): void;
}>();

const currentPage = ref(props.current);

watch(
  () => props.current,
  (newPage) => {
    currentPage.value = newPage;
  }
);

watch(currentPage, (page) => {
  emit("page-change", page);
  emit("update:current", page);
});

const handlePageChange = (page: number) => {
  currentPage.value = page;
};
</script>

<style scoped>
:deep(.ant-pagination-item a) {
  color: white !important;
}

:deep(.ant-pagination-item-active) {
  background-color: #1677ff;
  border-color: #1677ff;
}
:deep(.ant-pagination-item-active a) {
  color: white !important;
}

:deep(.ant-pagination-prev .ant-pagination-item-link),
:deep(.ant-pagination-next .ant-pagination-item-link) {
  color: white !important;
  background-color: transparent;
  border-color: #1677ff;
}

:deep(.ant-pagination-jump-prev .ant-pagination-item-link),
:deep(.ant-pagination-jump-next .ant-pagination-item-link) {
  color: white !important;
  background-color: transparent;
}

:deep(.ant-pagination-item-link-icon) {
  color: white !important;
}

:deep(.ant-pagination-item-ellipsis) {
  color: white !important;
}
</style>
