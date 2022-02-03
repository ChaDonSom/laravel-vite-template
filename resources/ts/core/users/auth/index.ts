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
        async getUser() {
            try {
                let response = await axios.get('/api/user')
                this.user = response.data
                this.authenticated = true
            } catch(e: any) {
                this.user = null
                this.authenticated = false
            }
        },
        async register(form: { post: Function }) {
            try {
                let data = await form.post('/register')
                this.authenticated = true
                this.axiosResponseInterceptor = axios.interceptors.response.use(undefined, (error: any) => {
                    if (error.response?.status == 419 || error.response?.status == 401) {
                        this.unauthenticate()
                        this.router.push({ name: 'index' })
                    }
                    return Promise.reject(error)
                })
                this.getUser()
                this.router.push({ name: 'index' })
            } catch (e: any) {
                this.unauthenticate()
            }
        },
        async login(form: { post: Function }) {
            try {
                let data = await form.post('/login')
                this.authenticated = true
                this.axiosResponseInterceptor = axios.interceptors.response.use(undefined, (error: any) => {
                    if (error.response?.status == 419 || error.response?.status == 401) {
                        this.unauthenticate()
                        this.router.push({ name: 'index' })
                    }
                    return Promise.reject(error)
                })
                this.getUser()
                this.router.push({ name: 'index' })
            } catch(e: any) {
                this.unauthenticate()
            }
        },
        async logout() {
            try {
                let response = await axios.post('/logout')
                this.unauthenticate()
                this.router.push({ name: 'index' })
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
        }
    }
})