<template>
  <div class="page-header clear-filter" :filter-color="filterColor">
    <Parallax
      class="page-header-image"
      style="background-image:url('img/header.jpg')"
    />
  </div>
</template>

<script>
import { Parallax } from "@/components";

export default {
  components: {
    Parallax
  },
  props: ["filterColor"]
};
</script>

<style></style>
