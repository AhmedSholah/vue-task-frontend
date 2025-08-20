<template>
  <div>
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
import AddMovieModal from "./components/AddMovieModal.vue";
import { ref, reactive } from "vue";

const isModalVisible = ref(false);

const isLoading = ref(false);

export interface FormState {
  name: string;
  description: string;
  imageUrl: string;
  genres: string[];
  inTheaters: boolean;
}

const formState = reactive<FormState>({
  name: "",
  description: "",
  imageUrl: "",
  genres: [],
  inTheaters: false,
});

const resetForm = () => {
  formState.name = "";
  formState.description = "";
  formState.imageUrl = "";
  formState.genres = [];
  formState.inTheaters = false;
};

const showModal = () => {
  isModalVisible.value = true;
};

const onFinish = (values: FormState) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const handleCancel = () => {
  isModalVisible.value = false;
  resetForm();
};
</script>
