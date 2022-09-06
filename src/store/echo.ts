import LaravelEcho from "laravel-echo";
import { defineStore } from "pinia";
import Pusher from "pusher-js";

export const useEcho = defineStore("echo", {
    state: () => ({
        echoState: new LaravelEcho({
            broadcaster: "pusher",
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true,
        }),
        pusherState: Pusher,
    }),
    getters: {
        echo: (state) => state.echoState,
        pusher: (state) => state.pusherState,
    },
});
