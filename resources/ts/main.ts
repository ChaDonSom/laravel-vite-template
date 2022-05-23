/*
|--------------------------------------------------------------------------
| Main entry point
|--------------------------------------------------------------------------
| Files in the "resources/scripts" directory are considered entrypoints
| by default. 
| 
| -> https://vitejs.dev
| -> https://github.com/innocenzi/laravel-vite
*/

import { createApp } from 'vue'
import App from '@/views/App.vue'
import { router } from '@/ts/router'
import { store } from '@/ts/store'
import '@/css/app.css'
import "floating-vue/dist/style.css";
import '@/css/popper.scss'
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import FloatingVue from 'floating-vue'
import LogRocket from 'logrocket'
const logrocketProject = import.meta.env.VITE_LOGROCKET_PROJECT
if (logrocketProject && typeof logrocketProject == 'string') {
    LogRocket.init(logrocketProject)
}
import * as PusherPushNotifications from "@pusher/push-notifications-web";
import { useBeams } from '@/ts/store/beams'

const VITE_PUSHER_BEAMS_INSTANCE_ID = import.meta.env.VITE_PUSHER_BEAMS_INSTANCE_ID

const updateSW = registerSW({
    onRegistered(registration: ServiceWorkerRegistration) {
        if (VITE_PUSHER_BEAMS_INSTANCE_ID && typeof VITE_PUSHER_BEAMS_INSTANCE_ID == 'string') {
            const beams = useBeams()
            beams.setBeams(new PusherPushNotifications.Client({
                instanceId: VITE_PUSHER_BEAMS_INSTANCE_ID,
                serviceWorkerRegistration: registration,
            }))
            beams.start().then(() => {
                beams.beams?.addDeviceInterest('debug-hello')
                console.log('added device interest "debug-hello"!')
                // Build something beatiful 🌈
            });
        }
    },
    onNeedRefresh() {
        if (confirm("New content, refresh please.")) window.location.reload()
    },
    onOfflineReady() {
        console.log("Offline ready.")
    },
    onRegisterError(error: any) {
        console.error(error)
    }
})

const app = createApp(App)
    .use(store)
    .use(router)
    .use(FloatingVue, {
        themes: {
            tooltip: {
                triggers: ["click", "touch", "hover", "focus"],
            },
        },
    })
    .mount("#app");
