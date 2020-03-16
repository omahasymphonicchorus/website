import Vue from "vue";
import Root from "./Root.vue";
import NowUiKit from "./plugins/now-ui-kit";

Vue.config.productionTip = false;

Vue.use(NowUiKit);

new Vue({
  render: h => h(Root)
}).$mount("#root");
