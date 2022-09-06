<template>
    <div>
        <div class="mdc-touch-target-wrapper" ref="mainRef">
            <button
                class="mdc-fab mdc-fab--touch"
                :class="{ secondary: secondary, 'mdc-fab--mini': small }"
            >
                <div class="mdc-fab__ripple"></div>
                <span class="material-icons mdc-fab__icon">{{ icon }}</span>
                <div class="mdc-fab__touch"></div>
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { MDCRipple } from "@material/ripple";
import { onMounted, ref } from "vue";

defineProps({
    secondary: Boolean,
    icon: String,
    small: Boolean,
});

const mainRef = ref<HTMLElement | null>(null);
onMounted(() => {
    const mdcFab: HTMLElement | null | undefined =
        mainRef.value?.querySelector(".mdc-fab");
    if (mdcFab) {
        const buttonRipple = new MDCRipple(mdcFab);
    }
});
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme"; // modify styles to our specifications
@use "@material/fab"; // allow customizing, via @include fab._____
@include fab.core-styles; // apply all styles

.mdc-fab {
    @include fab.accessible(mdc-theme.$primary);
    &.secondary {
        @include fab.accessible(mdc-theme.$secondary);
    }
}
</style>
