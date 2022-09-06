import { createPinia } from "pinia";
import type { PiniaPlugin } from "pinia";
import { markRaw } from "vue";
import { router } from "../router";
import "pinia";
import type { Router } from "vue-router";

export const store = createPinia();

const routerPlugin: PiniaPlugin = ({ store }) => ({
    router: markRaw(router),
});

store.use(routerPlugin);

// We have to type our new 'router' property so we can use it elsewhere with TS recognizing it
declare module "pinia" {
    export interface PiniaCustomProperties {
        get router(): Router;
    }
}
