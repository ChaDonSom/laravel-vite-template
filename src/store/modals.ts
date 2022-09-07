import ConfirmModalVue from "@/core/modals/ConfirmModal.vue";
import { defineStore } from "pinia";
import { markRaw } from "vue";
import type { Component } from "vue";

export type ModalListing = {
    id: number | string;
    modal: Component;
    props?: { [key: number | string]: any };
};

export const useModals = defineStore("modals", {
    state: () => ({
        data: {} as { [key: number | string]: ModalListing },
    }),
    getters: {
        keys: (state) => Object.keys(state.data),
        values: (state) => Object.values(state.data),
    },
    actions: {
        open(payload: Omit<ModalListing, "id">): number | string {
            const id = `modal-${this.keys.length}`;
            this.data[id] = {
                ...payload,
                id,
            };
            return id;
        },
        close(id: number | string) {
            delete this.data[id];
        },
        async confirm(message?: string) {
            return new Promise((resolve, reject) => {
                this.open({
                    modal: markRaw(ConfirmModalVue),
                    props: { resolve, reject, message },
                });
            });
        },
    },
});
