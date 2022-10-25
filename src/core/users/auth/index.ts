import { defineStore } from "pinia";
import LogRocket from "logrocket";
import { useBeams } from "@/store/beams";
import { useModals } from "@/store/modals";
import apiAxios, { type AxiosResponse } from "@/core/utilities/axios";

const VITE_SESSION_LIFETIME = import.meta.env.VITE_SESSION_LIFETIME;
console.log("VITE_SESSION_LIFETIME: ", VITE_SESSION_LIFETIME);

export type User = {
    id: number;
    [key: string]: any;
    account_holders?: { id: number; users: User[] }[];
};

export const useAuth = defineStore("auth", {
    state: () => ({
        user: <User | null>null,
        sanctumCookie: null as string | null,
        authenticated: false,
        axiosResponseInterceptor: <number | null>null,
        checkSessionTimeoutStopNumber: <ReturnType<typeof setTimeout> | null>null,
        guestRoutes: <string[]>["/", "/login", "/register"],
    }),
    actions: {
        axiosResponseInterceptorSuccess(response: AxiosResponse) {
            if (this.checkSessionTimeoutStopNumber) {
                clearTimeout(this.checkSessionTimeoutStopNumber);
            }
            this.checkSessionTimeoutStopNumber = setTimeout(() => {
                this.getUser(false);
            }, 1000 * 60 * VITE_SESSION_LIFETIME);
            return response
        },
        axiosResponseInterceptorError(error: any) {
            if (error.response?.status == 419 || error.response?.status == 401) {
                this.unauthenticate()
                this.router.push({ name: 'index' })
            }
            return Promise.reject(error)
        },
        async getSanctumCookie() {
            // We don't necessarily need to keep this in store, axios does.
            this.sanctumCookie = await apiAxios.get("/sanctum/csrf-cookie");
        },
        async getUser(registerAPIs = true) {
            try {
                const response = await apiAxios.get("/api/user");
                this.user = response.data;
                this.authenticated = true;

                if (this.user?.id && registerAPIs) {
                    // Set up response interceptors if they haven't been (e.g. refresh)
                    if (!this.axiosResponseInterceptor) {
                        this.axiosResponseInterceptor = apiAxios.interceptors.response.use(
                            this.axiosResponseInterceptorSuccess,
                            this.axiosResponseInterceptorError
                        )
                    }
                    // Identify the authenticated user to LogRocket
                    LogRocket.identify(String(this.user.id), this.user);

                    // Subscribe to Push Notifications aimed at the user
                    const beams = useBeams();
                    beams.newTokenProvider({
                        url: "/api/beams/token",
                        queryParams: {
                            user_id: String(this.user.id), // URL query params your auth endpoint needs
                        },
                        headers: this.sanctumCookie
                            ? {
                                  "X-XSRF-TOKEN": this.sanctumCookie,
                              }
                            : undefined,
                    });
                    console.log("beams.beams: ", beams.beams);
                    if (!beams.started) beams.start();
                    beams.waitTillStarted().then(() => {
                        if (this.user && beams.tokenProvider) {
                            beams.beams?.setUserId(
                                `App.Models.User.${this.user.id}`,
                                beams.tokenProvider
                            );
                            console.log(
                                "set user id to ",
                                `App.Models.User.${this.user.id}`
                            );
                        }
                    });
                }
            } catch (e: any) {
                let hadUser = Boolean(this.user);
                this.unauthenticate();
                // Disabled for now, so guests can access all experiments by default
                // Maybe we should list them out explicitly so we can make experiments that require a user?
                // if (!this.guestRoutes.includes(this.router.currentRoute.value.path)) {
                //     this.router.push({
                //         name: 'index',
                //         params: {
                //             securityLoggedOut: hadUser ? "We've logged you out for your security." : null
                //         }
                //     })
                // }
            }
        },
        async register(form: { post: () => Promise<any> }) {
            try {
                const data = await form.post();
                this.authenticated = true;
                this.axiosResponseInterceptor = apiAxios.interceptors.response.use(
                    this.axiosResponseInterceptorSuccess,
                    this.axiosResponseInterceptorError
                );
                this.getUser();
                this.router.push({ name: "index" });
            } catch (e: any) {
                this.unauthenticate();
            }
        },
        async login(form: { post: () => Promise<any> }) {
            try {
                const data = await form.post();
                this.authenticated = true;
                this.axiosResponseInterceptor = apiAxios.interceptors.response.use(
                    this.axiosResponseInterceptorSuccess,
                    this.axiosResponseInterceptorError
                );
                this.getUser();
                this.router.push({ name: "index" });
            } catch (e: any) {
                this.unauthenticate();
            }
        },
        async logout() {
            try {
                await useModals().confirm("Do you really want to log out?");
                const response = await apiAxios.post("/logout");
                this.unauthenticate();
                this.router.push({ name: "index" });
            } catch (e: any) {
                console.error(e);
            }
        },
        unauthenticate() {
            this.user = null;
            this.authenticated = false;
            if (this.axiosResponseInterceptor) {
                apiAxios.interceptors.response.eject(
                    this.axiosResponseInterceptor
                );
            }
            const beams = useBeams();
            if (beams.beams) {
                beams.stop().catch((error) => console.error(error));
            }
        },
    },
});
