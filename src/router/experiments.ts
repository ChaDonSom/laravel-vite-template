import type { RouteRecordRaw } from "vue-router";
const PhaserTutorial = () => import("@/experiments/phaser-tutorial/PhaserTutorial.vue")

const routes: RouteRecordRaw[] = [
    { name: "phaser-tutorial", path: "/phaser-tutorial", component: PhaserTutorial, props: true },
];

export default routes;
