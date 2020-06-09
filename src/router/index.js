import Vue from "vue";
//import VueRouter from 'vue-router'
import { IonicVueRouter } from "@ionic/vue";
//import TabRoot from "@/components/TabRoot.vue";
//import Home from "@/views/Home.vue";
//import Due from "@/components/Due.vue";

Vue.use(IonicVueRouter);
//Vue.use(VueRouter);

const routes = [
  {
    path:"/signIn",
    component: () => import("@/views/LogIn.vue"),
  },
  {
    path: "/:username",
    component: () => import("@/components/TabRoot.vue"),
    children: [
      {
        path: "home/",
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
  //const router = new VueRouter({
  mode: "history",
  base: "/",
  routes,
});

export default router;
