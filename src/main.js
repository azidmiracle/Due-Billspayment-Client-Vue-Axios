import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Ionic from "@ionic/vue";
import "@ionic/core/css/core.css";
import "@ionic/core/css/ionic.bundle.css";

import { home, menu, add, close, arrowForward,arrowBack,create,checkmark,card,calendar } from "ionicons/icons";
import { addIcons } from "ionicons";
addIcons({
  "ios-home": home.ios,
  "md-home": home.md,
  "ios-menu": menu.md,
  "md-menu": menu.md,
  "ios-add": add.ios,
  "md-add": add.md,
  "ios-close": close.ios,
  "md-close": close.md,
  "ios-arrow-forward": arrowForward.ios,
  "md-arrow-forward": arrowForward.md,
  "ios-arrow-back": arrowBack.ios,
  "md-arrow-back": arrowBack.md, 
  "ios-create": create.ios,
  "md-create": create.md,
  "md-checkmark": checkmark.md,
  "ios-checkmark": checkmark.ios,
  "md-card": card.md,
  "ios-card": card.ios,
  "md-calendar": calendar.md,
  "ios-calendar": calendar.ios
  
});

Vue.use(Ionic);
Vue.config.productionTip = false;
Vue.config.ignoredElements = [/^ion-/];

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
