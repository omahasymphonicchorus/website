<template>
  <fade-transition>
    <div id="app" v-if="site">
      <MainNavbar :site="site" />
      <div class="wrapper"></div>
      <MainFooter />
    </div>
  </fade-transition>
</template>
<script>
import { FadeTransition } from "vue2-transitions";
import MainFooter from "./layout/MainFooter.vue";
import MainNavbar from "./layout/MainNavbar.vue";
export default {
  name: "root",
  components: {
    FadeTransition,
    MainFooter,
    MainNavbar
  },
  data() {
    return {
      site: null
    };
  },
  async mounted() {
    this.site = await (await fetch("data/index.json")).json();
  }
};
</script>
