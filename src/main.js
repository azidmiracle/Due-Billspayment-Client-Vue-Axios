import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Ionic from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

import { add, close, arrowForward} from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "ios-add": add.ios,
  "md-add": add.md,
  "ios-close": close.ios,
  "md-close": close.md,
  "ios-arrow-forward": arrowForward.ios,
  "md-arrow-forward": arrowForward.md

});

Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.config.ignoredElements=[/^ion-/]

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
