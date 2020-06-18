import Vue from "vue";

import { IonicVueRouter } from "@ionic/vue";

Vue.use(IonicVueRouter);

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
        path: "home",
        name: "home",
        component: () => import("@/views/Home.vue"),
        children:[
          {
            path: ":duename",
            name: "due-name",
            component:() => import("@/views/Due.vue") 
          },
        ]
      },
      {
        path: "History",
        name: "History",
        component: () => import("@/views/History.vue")
      }
    
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
