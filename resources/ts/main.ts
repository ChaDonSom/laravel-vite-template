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

const updateSW = registerSW({
    // onNeedRefresh() {},
    // onOfflineReady() {},
    onRegisterError(error) {
        console.error(error)
    }
})

const app = createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
