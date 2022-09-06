import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import HelloWorld from "@/dev-intro/HelloWorld.vue";
import authRoutes from "@/router/auth";

let routes: RouteRecordRaw[] = [
    {
        name: "index",
        path: "/",
        component: HelloWorld,
        props: {
            msg: "Hello Laravel + Vite",
        },
    },
];
routes = routes.concat(authRoutes);

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
