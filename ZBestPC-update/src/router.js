/* import Router from 'vue-router' */

import { createRouter,createWebHashHistory} from "vue-router";
import Home from './Home.vue'
import Login from './Login.vue'

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: Home
  },
  {
    path: "/login",
    name: "login",
    component: Login
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})