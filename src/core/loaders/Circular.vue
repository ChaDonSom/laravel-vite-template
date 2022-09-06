<template>
    <div
        v-if="large || (!large && !medium && !small)"
        ref="mainRef"
        class="mdc-circular-progress mdc-circular-progress--indeterminate"
        style="width: 48px; height: 48px; overflow: hidden; margin: 4px"
        role="progressbar"
        aria-label="Example Progress Bar"
        aria-valuemin="0"
        aria-valuemax="1"
        :class="{ secondary: secondary }"
    >
        <div class="mdc-circular-progress__determinate-container">
            <svg
                class="mdc-circular-progress__determinate-circle-graphic"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    class="mdc-circular-progress__determinate-track"
                    cx="24"
                    cy="24"
                    r="18"
                    stroke-width="4"
                />
                <circle
                    class="mdc-circular-progress__determinate-circle"
                    cx="24"
                    cy="24"
                    r="18"
                    stroke-dasharray="113.097"
                    stroke-dashoffset="113.097"
                    stroke-width="4"
                />
            </svg>
        </div>
        <div class="mdc-circular-progress__indeterminate-container">
            <div class="mdc-circular-progress__spinner-layer">
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke-dasharray="113.097"
                            stroke-dashoffset="56.549"
                            stroke-width="4"
                        />
                    </svg>
                </div>
                <div class="mdc-circular-progress__gap-patch">
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke-dasharray="113.097"
                            stroke-dashoffset="56.549"
                            stroke-width="3.2"
                        />
                    </svg>
                </div>
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 48 48"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="24"
                            cy="24"
                            r="18"
                            stroke-dasharray="113.097"
                            stroke-dashoffset="56.549"
                            stroke-width="4"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else-if="medium"
        ref="mainRef"
        class="mdc-circular-progress mdc-circular-progress--indeterminate"
        style="width: 36px; height: 36px; overflow: hidden; margin: 4px"
        role="progressbar"
        aria-label="Example Progress Bar"
        aria-valuemin="0"
        aria-valuemax="1"
        :class="{ secondary: secondary }"
    >
        <div class="mdc-circular-progress__determinate-container">
            <svg
                class="mdc-circular-progress__determinate-circle-graphic"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    class="mdc-circular-progress__determinate-track"
                    cx="16"
                    cy="16"
                    r="12.5"
                    stroke-width="3"
                />
                <circle
                    class="mdc-circular-progress__determinate-circle"
                    cx="16"
                    cy="16"
                    r="12.5"
                    stroke-dasharray="78.54"
                    stroke-dashoffset="78.54"
                    stroke-width="3"
                />
            </svg>
        </div>
        <div class="mdc-circular-progress__indeterminate-container">
            <div class="mdc-circular-progress__spinner-layer">
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="16"
                            cy="16"
                            r="12.5"
                            stroke-dasharray="78.54"
                            stroke-dashoffset="39.27"
                            stroke-width="3"
                        />
                    </svg>
                </div>
                <div class="mdc-circular-progress__gap-patch">
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="16"
                            cy="16"
                            r="12.5"
                            stroke-dasharray="78.54"
                            stroke-dashoffset="39.27"
                            stroke-width="2.4"
                        />
                    </svg>
                </div>
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 32 32"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="16"
                            cy="16"
                            r="12.5"
                            stroke-dasharray="78.54"
                            stroke-dashoffset="39.27"
                            stroke-width="3"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
    <div
        v-else-if="small"
        ref="mainRef"
        class="mdc-circular-progress mdc-circular-progress--indeterminate"
        style="width: 24px; height: 24px; overflow: hidden; margin: 4px"
        role="progressbar"
        aria-label="Example Progress Bar"
        aria-valuemin="0"
        aria-valuemax="1"
        :class="{ secondary: secondary }"
    >
        <div class="mdc-circular-progress__determinate-container">
            <svg
                class="mdc-circular-progress__determinate-circle-graphic"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
            >
                <circle
                    class="mdc-circular-progress__determinate-track"
                    cx="12"
                    cy="12"
                    r="8.75"
                    stroke-width="2.5"
                />
                <circle
                    class="mdc-circular-progress__determinate-circle"
                    cx="12"
                    cy="12"
                    r="8.75"
                    stroke-dasharray="54.978"
                    stroke-dashoffset="54.978"
                    stroke-width="2.5"
                />
            </svg>
        </div>
        <div class="mdc-circular-progress__indeterminate-container">
            <div class="mdc-circular-progress__spinner-layer">
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-left"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="8.75"
                            stroke-dasharray="54.978"
                            stroke-dashoffset="27.489"
                            stroke-width="2.5"
                        />
                    </svg>
                </div>
                <div class="mdc-circular-progress__gap-patch">
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="8.75"
                            stroke-dasharray="54.978"
                            stroke-dashoffset="27.489"
                            stroke-width="2"
                        />
                    </svg>
                </div>
                <div
                    class="mdc-circular-progress__circle-clipper mdc-circular-progress__circle-right"
                >
                    <svg
                        class="mdc-circular-progress__indeterminate-circle-graphic"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="12"
                            cy="12"
                            r="8.75"
                            stroke-dasharray="54.978"
                            stroke-dashoffset="27.489"
                            stroke-width="2.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { MDCCircularProgress } from "@material/circular-progress";
import { onMounted, ref } from "vue";

defineProps({
    large: Boolean,
    medium: Boolean,
    small: Boolean,
    secondary: Boolean,
});

const mainRef = ref(null);
const mdcCircularProgress = ref<MDCCircularProgress | null>(null);
onMounted(() => {
    if (mainRef.value)
        mdcCircularProgress.value = new MDCCircularProgress(mainRef.value);
});
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/circular-progress";

@include circular-progress.core-styles;
.mdc-circular-progress {
    @include circular-progress.color(mdc-theme.$primary);
    &.secondary {
        @include circular-progress.color(mdc-theme.$secondary);
    }
}
</style>
