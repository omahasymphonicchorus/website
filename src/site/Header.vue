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
      <template slot="navbar-menu">
        <li
          class="nav-item"
          v-for="section in content.sections"
          v-bind:key="section.title"
        >
          <a class="nav-link" :href="section.link">{{ section.title }}</a>
        </li>
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
