import Vue from "vue";
import App from "./App.vue";
import NowUIKit from "./plugins/now-ui-kit";

Vue.config.productionTip = false;

Vue.use(NowUIKit);

new Vue({
  render: h => h(App)
}).$mount("#app");
