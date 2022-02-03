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
import { registerSW } from 'virtual:pwa-register'
import LogRocket from 'logrocket'
const logrocketProject = import.meta.env.VITE_LOGROCKET_PROJECT
if (logrocketProject && typeof logrocketProject == 'string') {
    LogRocket.init(logrocketProject)
}

const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm("New content, refresh please.")) window.location.reload()
    },
    onOfflineReady() {
        console.log("Offline ready.")
    },
    onRegisterError(error) {
        console.error(error)
    }
})

const app = createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
