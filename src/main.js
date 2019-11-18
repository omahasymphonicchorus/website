import Vue from "vue";
import App from "./App.vue";
import NowUIKit from "./plugins/now-ui-kit";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faFacebook, faAmazon } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendar, faFacebook, faAmazon);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

Vue.use(NowUIKit);

new Vue({
  render: h => h(App)
}).$mount("#app");
