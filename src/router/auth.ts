import Login from "@/core/users/auth/Login.vue";
import type { RouteRecordRaw } from "vue-router";
import Register from "@/core/users/auth/Register.vue";
import Profile from "@/core/users/Profile.vue";

const routes: RouteRecordRaw[] = [
    { name: "login", path: "/login", component: Login, props: true },
    { name: "register", path: "/register", component: Register, props: true },
    { name: "profile", path: "/profile", component: Profile, props: true },
];

export default routes;
