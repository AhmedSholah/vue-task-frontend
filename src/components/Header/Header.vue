<!-- <script lang="ts" setup>
import { ref } from "vue";
const open = ref<boolean>(false);

const showModal = () => {
  open.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  open.value = false;
};
</script>

<template>
  <div class="container">
    <a-flex
      >Total Movies: 1 / Average Ratign: 3.7
      <div>
        <a-button type="primary" @click="showModal">Add Movie</a-button>
      </div></a-flex
    >
  </div>
  <a-modal v-model:open="open" title="Basic Modal" @ok="handleOk">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </a-modal>
</template> -->

<template>
  <div>
    <a-button type="primary" @click="showModal"> Add New Movie </a-button>

    <a-modal
      v-model:open="isModalVisible"
      title="Add New Movie"
      @cancel="handleCancel"
      centered
    >
      <a-form :model="formState" layout="vertical" name="movie_form">
        <a-form-item label="Name">
          <a-input v-model:value="formState.name" />
        </a-form-item>

        <a-form-item label="Description">
          <a-textarea v-model:value="formState.description" :rows="4" />
        </a-form-item>

        <a-form-item label="Image">
          <a-input
            v-model:value="formState.imageUrl"
            placeholder="e.g., https://example.com/image.jpg"
          />
        </a-form-item>

        <a-form-item label="Genres">
          <a-select
            v-model:value="formState.genres"
            mode="multiple"
            style="width: 100%"
            placeholder="Select genres"
          >
            <a-select-option value="drama">Drama</a-select-option>
            <a-select-option value="crime">Crime</a-select-option>
            <a-select-option value="action">Action</a-select-option>
            <a-select-option value="comedy">Comedy</a-select-option>
            <a-select-option value="fantasy">Fantasy</a-select-option>
            <a-select-option value="sci-fi">Sci-Fi</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item>
          <a-checkbox v-model:checked="formState.inTheaters">
            In theaters
          </a-checkbox>
        </a-form-item>
      </a-form>

      <template #footer>
        <a-button key="back" @click="handleCancel">Cancel</a-button>
        <a-button
          key="submit"
          type="primary"
          :loading="isLoading"
          @click="handleOk"
          >Create</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Controls the visibility of the modal
const isModalVisible = ref(false);

// Controls the loading state of the "Create" button
const isLoading = ref(false);

// Holds the data for all the form fields
const formState = reactive({
  name: "Lord of the Rings: The Return of the King",
  description: "",
  imageUrl: "",
  genres: [], // This will hold an array of selected genre values, e.g., ['action', 'fantasy']
  inTheaters: false,
});

// Function to open the modal
const showModal = () => {
  isModalVisible.value = true;
};

// Function to handle the "Create" button click
const handleOk = () => {
  console.log("Form State Submitted:", formState);
  isLoading.value = true;

  // Simulate an API call
  setTimeout(() => {
    isLoading.value = false;
    isModalVisible.value = false;
    // Here you would typically reset the form or show a success message
  }, 2000); // 2-second delay
};

const handleCancel = () => {
  isModalVisible.value = false;
};
</script>
