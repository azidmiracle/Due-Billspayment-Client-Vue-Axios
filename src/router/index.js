import Vue from "vue";
//import VueRouter from 'vue-router'
import { IonicVueRouter } from "@ionic/vue";


Vue.use(IonicVueRouter);

const routes = [
  {
    path:"/signIn",
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/tabs",
    component: () => import("@/components/TabRoot.vue"),
    children: [
      {
        path: "home",
        name: "home",
        components: {
          homeRoute: () => import("@/views/Home.vue"),
        },
      },
      {
        path: "home/:duename",
        name: "due-name",
        components: {
          homeRoute: () => import("@/components/Due.vue"),
        },
      },
    ],
  },

  {
    path:"/",redirect:"/signIn"
  }
];

const router = new IonicVueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
