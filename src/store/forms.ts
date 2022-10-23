import type { AxiosResponse } from "axios";
import { computed, reactive, ref, toRefs, watch } from "vue";
import apiAxios from "@/core/utilities/axios";

export function useForm<T>(url: string, form: T) {
    const internalForm = reactive<object & T & { id?: number }>(
        JSON.parse(JSON.stringify(form))
    );
    watch(
        () => internalForm,
        () => (isDirty.value = true),
        { deep: true }
    );
    const isDirty = ref(false);
    function reset<T>(resetValues: T) {
        Object.assign(internalForm, resetValues);
        setTimeout(() => {
            isDirty.value = false;
            httpStatus.value = null;
        });
    }
    const errors = ref(
        Object.keys(form as Object).reduce((a, c) => {
            a[c] = undefined;
            return a;
        }, {} as { [key: string]: string | undefined })
    );
    function clearErrors() {
        errors.value = Object.keys(form as Object).reduce((a, c) => {
            a[c] = undefined;
            return a;
        }, {} as { [key: string]: string | undefined });
    }
    const hasErrors = computed(() =>
        Object.keys(errors.value).some((key) => errors.value[key])
    );
    const processing = ref(false);
    const processingDelete = ref(false);
    const processingNotDelete = computed(
        () => processing.value && !processingDelete.value
    );
    const recentlySuccessful = ref(false);
    let recentlySuccessfulTimeoutId: ReturnType<typeof setTimeout> | undefined =
        undefined;
    const httpStatus = ref<number | null>(null);

    async function submit(method: string, internalUrl?: string) {
        processing.value = true;
        if (method == "delete") processingDelete.value = true;
        recentlySuccessful.value = false;
        clearTimeout(recentlySuccessfulTimeoutId);

        try {
            let response: AxiosResponse<T> | AxiosResponse<string> | null =
                null;
            if (method === "delete") {
                response = (await apiAxios
                    .delete(internalUrl ?? url)
                    .catch((e: any) => onError(e))) as AxiosResponse<string>;
            } else {
                response = (await (apiAxios as any)
                    [method](internalUrl ?? url, internalForm)
                    .catch((e: any) => onError(e))) as AxiosResponse<T>;
            }
            return onSuccess(response ?? undefined);
        } catch (e: any) {
            return onError(e);
        }

        function onSuccess(
            response?: AxiosResponse<T> | AxiosResponse<string>
        ) {
            processing.value = false;
            processingDelete.value = false;
            clearErrors();
            recentlySuccessful.value = true;
            recentlySuccessfulTimeoutId = setTimeout(
                () => (recentlySuccessful.value = false),
                2000
            );
            isDirty.value = false;
            httpStatus.value = response?.status ?? null;
            return response?.data;
        }
        function onError(e: any) {
            processing.value = false;
            processingDelete.value = false;
            const data = e.response?.data ?? e;
            const status = e.response?.status;
            httpStatus.value = status;
            const errs: { [key: string]: any } = {};
            if (status == 422) {
                if (data?.message == "The given data was invalid.")
                    errs.message = `Whoops! Looks like you may have typed something wrong. Care to retry?`;
                Object.keys(data?.errors ?? {}).forEach((key) => {
                    if (data.errors[key])
                        errs[key] = data.errors[key].join("; ");
                });
            } else {
                console.log('e: ', e)
                console.log("data: ", data);
                if (status == 404) {
                    errs.message =
                        data?.message ??
                        `Route not found: ${e.response?.request?.responseURL}`;
                } else if (data?.message) {
                    errs.message = data?.message;
                } else if (data?.exception) {
                    errs.message = `Server exception: ${data.exception}`;
                } else {
                    if (e.message || Object.keys(errors.value).some((i) => e.hasOwnProperty(i))) {
                        Object.keys(e).forEach((key) => (errs[key] = e[key]));
                        if (!e.message)
                            errs.message = Object.keys(e)
                                .map((key) => `${key}: ${e[key]}`)
                                .join("");
                    } else {
                        errs.message = e.toString();
                    }
                }
            }
            clearErrors();
            errors.value = {
                ...errors.value,
                ...errs,
            };
            throw errs;
        }
    }
    const get = async () => submit("get", url);
    const post = async () => submit("post", url) as Promise<T & { id: number }>;
    const put = async () => {
        if (internalForm.id)
            return submit("put", `${url}/${internalForm.id}`) as Promise<
                T & { id: number }
            >;
        else throw Error("Form has no id");
    };
    const patch = async () => {
        if (internalForm.id)
            return submit("patch", `${url}/${internalForm.id}`) as Promise<
                T & { id: number }
            >;
        else throw Error("Form has no id");
    };
    const internalDelete = async () => {
        if (internalForm.id)
            submit("delete", `${url}/${internalForm.id}`) as Promise<string>;
        else throw Error("Form has no id");
    };
    const createOrUpdate = async () => {
        if (internalForm.id) return patch();
        return post();
    };

    return reactive({
        ...toRefs(internalForm),
        internalForm,
        isDirty,
        httpStatus,
        reset,
        errors,
        clearErrors,
        hasErrors,
        processing,
        processingDelete,
        processingNotDelete,
        recentlySuccessful,
        submit,
        get,
        post,
        put,
        patch,
        delete: internalDelete,
        createOrUpdate,
    });
}
