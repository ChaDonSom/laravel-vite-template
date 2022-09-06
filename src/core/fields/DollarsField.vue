<template>
    <div class="m-2 mt-4">
        <label
            ref="mainRef"
            class="mdc-text-field mdc-text-field--outlined"
            :class="{
                [`density-${density}`]: density,
                'mdc-text-field--with-leading-icon': icon,
            }"
        >
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
            <TextfieldIcon
                v-if="icon"
                @click="$emit('icon-click', $event)"
                leading
                >{{ icon }}</TextfieldIcon
            >
            <span class="mdc-text-field__affix mdc-text-field__affix--prefix"
                >$</span
            >
            <input
                :id="`textfield-input-${id}`"
                type="number"
                step="0.01"
                min="0"
                max="1000000000"
                class="mdc-text-field__input"
                :aria-labelledby="`textfield-label-${id}`"
                :value="modelValue"
                :autofocus="autofocus"
                @focus="
                    autoselect
                        ? ($event.target as HTMLInputElement).select()
                        : null
                "
                @input="
                    $emit(
                        'update:modelValue',
                        ($event?.target as HTMLInputElement)?.value
                    )
                "
                @change="change"
                @keydown.enter="$emit('keydown-enter', $event)"
                @blur="$emit('blur', $event)"
            />
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
import { onMounted, ref } from "vue";
import TextfieldIcon from "@/core/fields/TextfieldIcon.vue";

const props = defineProps({
    modelValue: [String, Number],
    error: String,
    helper: String,
    autoselect: Boolean,
    autofocus: Boolean,
    density: {
        type: Number,
        default: () => 0,
    },
    icon: String,
});

const emit = defineEmits([
    "update:modelValue",
    "blur",
    "icon-click",
    "change",
    "keydown-enter",
]);

const id = ref(Math.floor(Math.random() * 10000000));
const mainRef = ref<Element | null>(null);
const mdcTextfield = ref<MDCTextField | null>(null);
onMounted(() => {
    if (mainRef.value) mdcTextfield.value = new MDCTextField(mainRef.value);
    if (props.autofocus) mainRef.value?.querySelector("input")?.focus();
});

function change(event: Event) {
    const value = (event.target as HTMLInputElement)?.value;
    const split = value?.split(".");
    const afterDecimal = split[1];
    if (!afterDecimal || afterDecimal.length != 2) {
        const beforeDecimal = split[0] ?? "0";
        let replacementDecimal = afterDecimal ?? "00";
        if (afterDecimal?.length) {
            if (afterDecimal.length == 1)
                replacementDecimal = `${afterDecimal}0`;
            else
                replacementDecimal = String(
                    Math.round(
                        Number(
                            afterDecimal.slice(0, 2) +
                                "." +
                                afterDecimal.slice(2)
                        )
                    )
                );
        }
        emit("change", `${beforeDecimal}.${replacementDecimal}`);
        emit("update:modelValue", `${beforeDecimal}.${replacementDecimal}`);
    } else {
        emit("change", Number(value).toFixed(2));
    }
}
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/floating-label/mdc-floating-label";
@use "@material/line-ripple/mdc-line-ripple";
@use "@material/notched-outline/mdc-notched-outline";
@use "@material/textfield";

$densities: (-4, -3, -2, -1);

@include textfield.core-styles;
.mdc-text-field {
    @each $density in $densities {
        &.density-#{$density} {
            @include textfield.outlined-density($density);
        }
        // A fix specifically for density -4 (the other densities need it too)
        &.mdc-text-field.density--4.mdc-text-field--with-leading-icon
            .mdc-notched-outline--upgraded
            .mdc-floating-label--float-above {
            transform: translateX(-32px) translateY(-26.75px) scale(0.75);
        }
    }
    @include textfield.outline-shape-radius(mdc-theme.$textfield-shape-radius);
}

// Tailwind 'undo' RE MDC mess-up, recommended by Adam Wathan (fixes tons of borders showing up on focus in MDC)
*,
*::before,
*::after {
    border-width: 1px;
    border-style: none;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    display: block;
    -webkit-appearance: button;
}
</style>
