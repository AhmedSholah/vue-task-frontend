<script setup lang="ts">
import IconStar from "./icons/IconStar.vue";
import { ref, watch } from "vue";

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
              5
            </span>
          </span>
        </div>
        <img
          alt="example"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      </div>
    </template>

    <div class="!font-bold text-2xl">Title</div>

    <div class="flex flex-wrap gap-2 !my-3">
      <a-badge count="Crime" :number-style="{ backgroundColor: '#5951dc' }" />
      <a-badge count="Crime" :number-style="{ backgroundColor: '#5951dc' }" />
      <a-badge count="Crime" :number-style="{ backgroundColor: '#5951dc' }" />
    </div>

    <div>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maiores
      voluptatum veniam officiis laboriosam, blanditiis praesentium nostrum
      aperiam provident recusandae placeat ab earum, ipsam culpa consequatur
      architecto commodi sit nemo esse?
    </div>

    <div class="flex gap-5 items-center !mt-5">
      <span>Rating: (0/5)</span>
      <a-rate v-model:value="value" />
    </div>
  </a-card>
</template>
