<template>
    <i
        ref="mainRef"
        :id="randomId"
        class="material-icons mdc-text-field__icon"
        :class="{
            'mdc-text-field__icon--leading': leading && !trailing,
            'mdc-text-field__icon--trailing': trailing,
        }"
        tabindex="0"
        role="button"
        @click="redirectFocusBackToInput"
    >
        <slot></slot>
    </i>
</template>

<script setup lang="ts">
import { MDCTextFieldIcon } from "@material/textfield/icon";
import { onMounted, ref } from "vue";

const props = defineProps({
    leading: {
        type: Boolean,
        default: () => true,
    },
    trailing: Boolean,
});

const randomId = ref(`textfield-icon-random-${Math.random()}`)
const mainRef = ref<HTMLElement | null>(null);
const mdcIcon = ref<MDCTextFieldIcon | null>(null);
onMounted(() => {
    if (mainRef.value) mdcIcon.value = new MDCTextFieldIcon(mainRef.value);
});

function redirectFocusBackToInput(event: MouseEvent) {
    const input: HTMLInputElement | null | undefined = (
        event.target as HTMLElement
    )?.parentElement?.querySelector("input.mdc-text-field__input");
    if (input) input.focus();
}
</script>

<style scoped lang="scss">
@use "@material/textfield/icon";

@include icon.icon-core-styles;

.mdc-text-field__icon {
    color: var(--color-text) !important;
    &.mdc-text-field__icon--leading {
        @include icon.leading-icon-color(var(--color-text));
    }
    &.mdc-text-field__icon--trailing {
        @include icon.trailing-icon-color(var(--color-text));
    }
}
</style>
