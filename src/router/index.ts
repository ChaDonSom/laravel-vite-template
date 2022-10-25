import { createRouter, createWebHashHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import Index from "@/experiments/Index.vue";
import authRoutes from "@/router/auth";
import experimentsRoutes from "@/router/experiments";

let routes: RouteRecordRaw[] = [
    {
        name: "index", path: "/", component: Index, props: true,
    },
];
routes = routes.concat(authRoutes).concat(experimentsRoutes);

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
