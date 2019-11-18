<template>
  <div id="site">
    <transition name="fade">
      <Header v-if="content" :content="content" />
      <Footer />
    </transition>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";

export default {
  components: {
    Header,
    Footer
  },
  data: function() {
    return {
      content: null
    };
  },
  async mounted() {
    this.content = await fetch(`${location.origin}/data/index.json`).then(r =>
      r.json()
    );
  }
};
</script>

<style></style>
