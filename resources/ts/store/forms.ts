import { defineStore } from "pinia";
import { isEqual, cloneDeep } from 'lodash'
import { reactive, watch } from 'vue'
import { RemovableRef, useStorage } from "@vueuse/core";
import axios, { AxiosResponse, AxiosStatic } from 'axios'
import { DateTime } from "luxon";
type FormData = {
  data: {},
  errors: {},
  at: string,
}

export function useForm(...args: any[]) {
  const rememberKey = typeof args[0] === 'string' ? args[0] : args[0]?.formId ?? args[0]?.id ?? null
  const formTimeLimit = (typeof args[0] === 'string' ? 5 : args[0]?.formTimeLimit) ?? 5 // 5 minute default

  const data: FormData = (typeof args[0] === 'string' ? args[1] : args[0]) || {}
  const restored: RemovableRef<FormData> | null = rememberKey ? useStorage(rememberKey, data) : null
  let storedAt = restored?.value?.at ? DateTime.fromSeconds(Number(restored?.value?.at)) : DateTime.now().minus({ day: 1 })
  if (restored && DateTime.now().diff(storedAt, 'minutes').minutes > formTimeLimit) restored.value = null
  let defaults = cloneDeep(data)
  let cancelToken: any | null = null
  let recentlySuccessfulTimeoutId: number | undefined = undefined
  let transform = (data: { [key: string]: any }): { [key: string]: any } => data

  let form = reactive({
    ...(restored?.value?.data ? restored.value.data : data),
    isDirty: false,
    errors: restored?.value?.errors ? restored.value.errors : {},
    hasErrors: false,
    processing: false,
    processingDelete: false,
    processingNotDelete() {
      return this.processing && !this.processingDelete
    },
    progress: null,
    wasSuccessful: false,
    recentlySuccessful: false,
    data() {
      return Object.keys(data)
        .reduce((carry: { [key: string]: any}, key) => {
          // @ts-ignore
          carry[key] = this[key]
          return carry
        }, {})
    },
    transform(callback: (data: { [key: string]: any }) => { [key: string]: any }) {
      transform = callback

      return this
    },
    defaults(key?: string, value?: any) {
      if (typeof key === 'undefined') {
        // @ts-ignore
        defaults = this.data()
      } else {
        defaults = Object.assign(
          {},
          cloneDeep(defaults),
          value ? ({ [key]: value }) : key,
        )
      }

      return this
    },
    reset(...fields: any[]) {
      let clonedDefaults = cloneDeep(defaults)
      if (fields.length === 0) {
        Object.assign(this, clonedDefaults)
      } else {
        Object.assign(
          this,
          Object
            .keys(clonedDefaults)
            .filter(key => fields.includes(key))
            .reduce((carry: { [key: string]: any }, key) => {
              // @ts-ignore
              carry[key] = clonedDefaults[key]
              return carry
            }, {}),
        )
      }

      return this
    },
    setError(key: string | {}, value?: any) {
      if (!value && typeof key == 'object') Object.assign(this.errors, key)
      else if (typeof key == 'string') Object.assign(this.errors, { [key]: value })

      this.hasErrors = Object.keys(this.errors).length > 0

      return this
    },
    clearErrors(...fields: any[]) {
      this.errors = Object
        .keys(this.errors)
        .reduce((carry, field) => ({
          ...carry,
          // @ts-ignore
          ...(fields.length > 0 && !fields.includes(field) ? { [field] : this.errors[field] } : {}),
        }), {})

      this.hasErrors = Object.keys(this.errors).length > 0

      return this
    },
    async submit(method: string, url: string) {
      const data = transform(this.data())

      this.processing = true
      if (method == 'delete') this.processingDelete = true
      this.wasSuccessful = false
      this.recentlySuccessful = false
      clearTimeout(recentlySuccessfulTimeoutId)

      const onError = (e: any) => {
        this.processing = false
        this.processingDelete = false
        this.progress = null
        let data = e.response?.data
        let status = e.response?.status
        let errors: { [key: string]: any } = {}
        if (status == 422) {
          if (data?.message == 'The given data was invalid.') errors.message = `Whoops! Looks like you may have typed something wrong. Care to retry?`
          if (data?.errors.email) errors.email = data.errors.email.join(';')
          if (data?.errors.password) errors.password = data.errors.password.join(';')
        } else {
          if (data?.message) errors.message = data?.message
          else errors.message = e.toString()
        }
        this.clearErrors().setError(errors)
        throw errors
      }

      const onSuccess = (response?: AxiosResponse) => {
        this.processing = false
        this.processingDelete = false
        this.progress = null
        this.clearErrors()
        this.wasSuccessful = true
        this.recentlySuccessful = true
        recentlySuccessfulTimeoutId = setTimeout(() => this.recentlySuccessful = false, 2000)
        cancelToken = null
        // @ts-ignore
        defaults = cloneDeep(this.data())
        this.isDirty = false
        return response?.data
      }

      try {
        let response: AxiosResponse | null = null
        if (method === 'delete') {
          response = await axios.delete(url)
        } else {
          response = await (axios as any)[method](url, data)
        }
        return onSuccess(response ?? undefined)
      } catch (e: any) {
        return onError(e)
      }
    },
    get(url: string) {
      return this.submit('get', url)
    },
    post(url: string) {
      return this.submit('post', url)
    },
    put(url: string) {
      return this.submit('put', url)
    },
    patch(url: string) {
      return this.submit('patch', url)
    },
    delete(url: string) {
      return this.submit('delete', url)
    },
    cancel() {
      if (cancelToken) {
        cancelToken.cancel()
      }
    },
    __remember() {
      return { data: this.data(), errors: this.errors, at: String(DateTime.now().toSeconds()) }
    },
    __restore(restored: { data: {}, errors: {} }) {
      Object.assign(this, restored.data)
      this.setError(restored.errors)
    },
  })

  watch(form, newValue => {
    form.isDirty = !isEqual(form.data(), defaults)
    // I'm assuming useStorage() will take care of the 'remember in storage' functionality automatically
    if (rememberKey) {
      if (restored) restored.value = newValue.__remember()
    }
  }, { immediate: true, deep: true })

  return form
}

export type Form<T> = ReturnType<typeof useForm> & {
  [Property in keyof T]: T[Property]
} & {
  errors: {
    [Property in keyof T]: string
  }
}

export const useForms = defineStore('forms', {
  state: () => ({
    data: {} as { [key: string | number]: any }
  }),
  getters: {
    keys: (state) => Object.keys(state.data),
    values: (state) => Object.values(state.data),
  },
  actions: {
    make(form: { id?: string | number, formId?: string, [key: string]: any }) {
      let id: string | number | undefined = form.formId ?? `form-${this.keys.length}`
      let f = useForm(form)
      this.data[id] = f
      return this.data[id] as typeof f & Form<typeof form>
    },
  }
})