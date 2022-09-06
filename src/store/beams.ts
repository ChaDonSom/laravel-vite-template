import { Client, TokenProvider } from "@pusher/push-notifications-web";
import type { TokenProviderOptions } from "@pusher/push-notifications-web";
import { useEventBus } from "@vueuse/core";
import { defineStore } from "pinia";

export const useBeams = defineStore("beams", {
    state: () => ({
        beamsClient: null as Client | null,
        tokenProviderState: null as TokenProvider | null,
        bus: useEventBus<string>("beams"),
        started: false,
    }),
    getters: {
        beams: (state) => state.beamsClient,
        tokenProvider: (state) => state.tokenProviderState,
    },
    actions: {
        setBeams(payload: Client) {
            this.beamsClient = payload;
        },
        newTokenProvider(payload: TokenProviderOptions): TokenProvider | null {
            this.tokenProviderState = new TokenProvider(payload);
            return this.tokenProvider;
        },
        async start() {
            return this.beams?.start().then(() => {
                this.bus.emit("started");
                this.started = true;
            });
        },
        async waitTillStarted() {
            return new Promise<void>((resolve, reject) => {
                if (this.started) return resolve();
                else
                    this.bus.on((event: string) => {
                        if (event == "started") resolve();
                    });
            });
        },
        async stop() {
            return this.beams?.stop().then(() => {
                this.bus.emit("stopped");
                this.started = false;
            });
        },
    },
});
