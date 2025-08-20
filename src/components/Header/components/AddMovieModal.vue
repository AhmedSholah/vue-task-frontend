<script setup lang="ts">
import type { FormState } from "../Header.vue";

interface Props {
  opened: boolean;
  formState: FormState;
  handleCancel: () => void;
  onFinish: (values: FormState) => void;
  onFinishFailed: (error: any) => void;
}

const props = defineProps<Props>();
</script>

<template>
  <a-modal
    v-bind:open="opened"
    title="Add New Movie"
    @cancel="handleCancel"
    centered
    :footer="null"
  >
    <a-form
      :model="formState"
      layout="vertical"
      name="movie_form"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Please provide a movie name' }]"
      >
        <a-input v-model:value="formState.name" placeholder="Enter name here" />
      </a-form-item>

      <a-form-item label="Description" name="description">
        <a-textarea
          v-model:value="formState.description"
          :auto-size="{ minRows: 4, maxRows: 6 }"
          placeholder="Enter description here"
        />
      </a-form-item>

      <a-form-item
        label="image"
        name="imageUrl"
        :rules="[{ required: true, message: 'Please provide an image URL' }]"
      >
        <a-input
          v-model:value="formState.imageUrl"
          placeholder="e.g., https://example.com/image.jpg"
        />
      </a-form-item>

      <a-form-item label="Genres" name="genres">
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
        </a-select>
      </a-form-item>

      <a-form-item name="inTheaters">
        <a-checkbox v-model:checked="formState.inTheaters">
          In theaters
        </a-checkbox>
      </a-form-item>

      <!-- <a-form-item style="margin-bottom: 0 !important"> -->
      <div style="display: flex; justify-content: space-between">
        <a-button @click="handleCancel">Cancel</a-button>
        <a-button type="primary" html-type="submit" :loading="false"
          >Create</a-button
        >
      </div>
      <!-- </a-form-item> -->
    </a-form>
  </a-modal>
</template>
