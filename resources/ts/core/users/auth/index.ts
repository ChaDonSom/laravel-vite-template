import axios from "axios";
import { defineStore } from "pinia";
import LogRocket from "logrocket";
import { useBeams } from "@/ts/store/beams";
import { useModals } from "@/ts/store/modals";

export const useAuth = defineStore('auth', {
    state: () => ({
        user: <{ id: number, [key: string]: any } | null> null,
        sanctumCookie: null as string | null,
        authenticated: false,
        axiosResponseInterceptor: <number | null> null,
        guestRoutes: <string[]> [
            '/', '/login', '/register'
        ]
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

                if (this.user?.id) {
                    // Identify the authenticated user to LogRocket
                    LogRocket.identify(String(this.user.id), this.user)

                    // Subscribe to Push Notifications aimed at the user
                    const beams = useBeams()
                    beams.newTokenProvider({
                        url: "/api/beams/token",
                        queryParams: {
                            user_id: String(this.user.id), // URL query params your auth endpoint needs
                        },
                        headers: this.sanctumCookie ? {
                            'X-XSRF-TOKEN': this.sanctumCookie
                        } : undefined,
                    });
                    console.log('beams.tokenProvider: ', beams.tokenProvider);
                    console.log('beams.beams: ', beams.beams);
                    if (!beams.started) beams.start()
                    beams.waitTillStarted().then(() => {
                        if (this.user && beams.tokenProvider) {
                            beams.beams?.setUserId(`App.Models.User.${this.user.id}`, beams.tokenProvider)
                            console.log('set user id to ', `App.Models.User.${this.user.id}`)
                        }
                    })
                }
            } catch(e: any) {
                this.unauthenticate()
                if (!this.guestRoutes.includes(this.router.currentRoute.value.path)) {
                    this.router.push({ name: 'index' })
                }
            }
        },
        async register(form: { post: Function }) {
            try {
                let data = await form.post()
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
                let data = await form.post()
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
                await useModals().confirm('Do you really want to log out?')
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
            const beams = useBeams()
            if (beams.beams) {
                beams.stop().catch(error => console.error(error))
            }
        }
    }
})