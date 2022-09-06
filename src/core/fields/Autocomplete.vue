<template>
    <div class="m-2 mt-4">
        <label class="mdc-text-field mdc-text-field--outlined" ref="mainRef">
            <span class="mdc-notched-outline">
                <span class="mdc-notched-outline__leading"></span>
                <span class="mdc-notched-outline__notch">
                    <span
                        class="mdc-floating-label"
                        :id="`textfield-label-${id}`"
                        ><slot
                    /></span>
                </span>
                <span class="mdc-notched-outline__trailing"></span>
            </span>
            <i
                v-if="$slots['leading-icon']"
                class="material-icons mdc-text-field__icon mdc-text-field__icon--leading"
                tabindex="0"
                role="button"
                @click="$emit('clickLeadingIcon', $event)"
            >
                <slot name="leading-icon"></slot>
            </i>
            <input
                :id="`textfield-input-${id}`"
                :list="`textfield-list-${id}`"
                :type="type ?? 'text'"
                :aria-labelledby="`textfield-label-${id}`"
                :autofocus="autofocus"
                class="mdc-text-field__input"
                ref="inputRef"
                @focus="
                    autoselect
                        ? ($event.target as HTMLInputElement).select()
                        : null
                "
                @input="input"
            />
            <i
                v-if="$slots['trailing-icon']"
                class="material-icons mdc-text-field__icon mdc-text-field__icon--trailing"
                tabindex="0"
                role="button"
                @click="$emit('clickTrailingIcon', $event)"
            >
                <slot name="trailing-icon"></slot>
            </i>
            <datalist :id="`textfield-list-${id}`">
                <option
                    v-for="option of autocompleteOptions"
                    :key="option?.id"
                    :data-value="option?.id"
                >
                    {{ option?.label }}
                </option>
            </datalist>
        </label>
        <div class="mdc-text-field-helper-line max-w-fit">
            <div
                id="my-helper-id"
                class="mdc-text-field-helper-text"
                aria-hidden="true"
                :style="{
                    opacity: 1,
                    color: error ? 'rgb(181 30 30)' : undefined,
                }"
            >
                {{ error ? error : helper ? helper : "" }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MDCTextField } from "@material/textfield";
import { computed, onMounted, ref, watch } from "vue";

const props = defineProps({
    modelValue: [String, Number],
    options: Array,
    type: String,
    error: String,
    helper: String,
    autoselect: Boolean,
    autofocus: Boolean,
});

const emit = defineEmits([
    "update:modelValue",
    "update:textValue",
    "clickLeadingIcon",
    "clickTrailingIcon",
]);

const id = ref(Math.floor(Math.random() * 10000000));
const mainRef = ref<Element | null>(null);
const mdcTextfield = ref<MDCTextField | null>(null);
onMounted(() => {
    if (mainRef.value) mdcTextfield.value = new MDCTextField(mainRef.value);
    if (props.autofocus) mainRef.value?.querySelector("input")?.focus();
});

const autocompleteOptions = computed(
    () =>
        (props.options ?? []) as {
            id: number;
            label: string;
        }[]
);
const optionsIdsByLabels = computed(() =>
    autocompleteOptions.value.reduce((acc: { [key: string]: number }, curr) => {
        acc[curr.label] = curr.id;
        return acc;
    }, {})
);
const optionsLabelsByIds = computed(() =>
    autocompleteOptions.value.reduce((acc: { [key: number]: string }, curr) => {
        acc[curr.id] = curr.label;
        return acc;
    }, {})
);

const inputRef = ref<HTMLInputElement | null>(null);
function input(event: Event) {
    const value = (event?.target as HTMLInputElement)?.value;
    const potentialValue = optionsIdsByLabels.value[value] ?? null;
    emit("update:modelValue", potentialValue);
    emit("update:textValue", value);
}
onMounted(() => {
    watch(
        () => props.modelValue,
        (to) => {
            setTimeout(() => {
                if (typeof to == "number" && mdcTextfield.value) {
                    mdcTextfield.value.value =
                        optionsLabelsByIds.value[Number(to)];
                }
            });
        },
        { immediate: true }
    );
});
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";
@use "@material/textfield/icon";

@include textfield.core-styles;
@include icon.icon-core-styles;

.mdc-text-field {
    @include textfield.outline-shape-radius(mdc-theme.$textfield-shape-radius);
    // @include textfield.outlined-density(-4);
}

// Tailwind 'undo' RE MDC mess-up, recommended by Adam Wathan (fixes tons of borders showing up on focus in MDC)
*,
*::before,
*::after {
    border-width: 1px;
    border-style: none;
}

// For some reason, if we don't have this, date-type inputs don't show the calendar icon
input[type="date"]::-webkit-calendar-picker-indicator {
    display: block;
    -webkit-appearance: button;
}
</style>
