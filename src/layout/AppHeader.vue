<template>
  <header>
    <Navbar
      position="fixed"
      type="primary"
      :transparent="transparent"
      :color-on-scroll="colorOnScroll"
      menu-classes="ml-auto"
    >
      <template>
        <a class="navbar-brand" href="/">{{ content.title }}</a>
      </template>
    </Navbar>
  </header>
</template>

<script>
import { Navbar } from "@/components";
export default {
  data: function() {
    return {
      transparent: true,
      colorOnScroll: 400
    };
  },
  props: ["content"],
  components: {
    Navbar
  }
};
</script>

<style></style>
