import { createRouter, createWebHashHistory } from "vue-router"
import HelloWorld from '@/ts/dev-intro/HelloWorld.vue'

const routes = [
    { path: '/', component: HelloWorld }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
