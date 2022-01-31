import axios from "axios";
import { defineStore } from "pinia";

export const useAuth = defineStore('auth', {
    state: () => ({
        user: null,
        sanctumCookie: null,
        authenticated: false,
        axiosResponseInterceptor: <number | null> null,
    }),
    actions: {
        async getSanctumCookie() {
            // We don't necessarily need to keep this in store, axios does.
            this.sanctumCookie = await axios.get('/sanctum/csrf-cookie')
        },
        async register(form: { post: Function }) {
            let data = await form.post('/register')
            this.authenticated = true
            this.axiosResponseInterceptor = axios.interceptors.response.use(undefined, (error: any) => {
                if (error.response?.status == 419 || error.response?.status == 401) {
                    this.unauthenticate()
                }
                return Promise.reject(error)
            })
            this.router.push({ name: 'index' })
        },
        async login(form: { post: Function }) {
            let data = await form.post('/login')
            this.authenticated = true
            this.router.push({ name: 'index' })
        },
        async logout() {
            try {
                let response = await axios.post('/logout')
                this.unauthenticate()
            } catch (e: any) {
                console.error(e)
            }
        },
        unauthenticate() {
            this.user = null
            this.authenticated = false
            if (this.axiosResponseInterceptor) {
                axios.interceptors.response.eject(this.axiosResponseInterceptor)
            }
            this.router.push({ name: 'index' })
        }
    }
})