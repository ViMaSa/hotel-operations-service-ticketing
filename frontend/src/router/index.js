import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/HomePage.vue";
import Dashboard from "@/views/DashboardPage.vue";
import LogIn from "@/views/LogInPage.vue";
import Register from "@/views/RegisterPage.vue";
import CreateTicket from "@/views/CreateTicketPage.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/login",
    name: "LogIn",
    component: LogIn
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/create-ticket",
    name: "CreateTicket",
    component: CreateTicket
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
