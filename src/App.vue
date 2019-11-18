<template>
  <div id="app">
    <AppHeader v-if="content" :content="content" />
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from "./layout/AppHeader.vue";
import AppFooter from "./layout/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter
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

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700,200");
@import "~@fortawesome/fontawesome-free/scss/fontawesome.scss";
</style>
