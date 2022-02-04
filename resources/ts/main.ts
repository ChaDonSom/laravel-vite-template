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
// @ts-ignore
import { registerSW } from 'virtual:pwa-register'
import LogRocket from 'logrocket'
const logrocketProject = import.meta.env.VITE_LOGROCKET_PROJECT
if (logrocketProject && typeof logrocketProject == 'string') {
    LogRocket.init(logrocketProject)
}
import * as PusherPushNotifications from "@pusher/push-notifications-web";

const updateSW = registerSW({
    onRegistered(registration: ServiceWorkerRegistration) {
        const beamsClient = new PusherPushNotifications.Client({
            instanceId: "01b6e1af-a514-45f6-bfe7-f9cd88f1296f",
            serviceWorkerRegistration: registration,
        });
        beamsClient.start().then(() => {
            beamsClient.addDeviceInterest('debug-hello')
            console.log('added device interest "debug-hello"!')
            // Build something beatiful 🌈
        });

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
    .mount('#app')
