import ConfirmModalVue from '@/ts/core/modals/ConfirmModal.vue';
import { defineStore } from 'pinia';
import { Component, markRaw } from 'vue';

export type ModalListing = {
    id: number | string,
    modal: Component,
    props?: { [key: number | string]: any }
}

export const useModals = defineStore('modals', {
    state: () => ({
        data: {} as { [key: number | string]: ModalListing },
    }),
    getters: {
        keys: (state) => Object.keys(state.data),
        values: (state) => Object.values(state.data),
    },
    actions: {
        open(payload: Omit<ModalListing, 'id'>): number | string {
            let id = `modal-${this.keys.length}`
            let urlModals = (this.router.currentRoute.value.query.modals ?? []) as string[]
            this.router.push({ query: { modals: [
                ...urlModals,
                id
            ] } })
            this.data[id] = {
                ...payload,
                id
            }
            return id
        },
        close(id: number | string) {
            this.router.back()
            delete this.data[id]
        },
        async confirm(message?: string) {
            return new Promise((resolve, reject) => {
                this.open({
                    modal: markRaw(ConfirmModalVue),
                    props: { resolve, reject, message }
                })
            })
        }
    }
})