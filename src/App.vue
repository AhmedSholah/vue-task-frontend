<script setup lang="ts">
import Header from "./components/Header/Header.vue";
</script>

<template>
  <header>
    <Header />
  </header>

  <main>
    <div class="container"></div>
  </main>
</template>

<style>
main {
  background-color: #131821;
  min-height: 100vh;
}
header {
  background-color: #131821;
}
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
}
</style>
