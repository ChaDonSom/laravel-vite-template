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

const app = createApp(App)
    .use(store)
    .use(router)
    .mount('#app')
