<template>
    <Button :disabled="disabled">
        <template #leading-icon>delete</template>
        <template v-if="!loading"> Delete </template>
        <template v-else>
            <Circular small />
        </template>
    </Button>
</template>

<script setup lang="ts">
import Button from "@/core/buttons/Button.vue";
import Circular from "@/core/loaders/Circular.vue";

defineProps({
    disabled: Boolean,
    loading: Boolean,
});
</script>

<style lang="scss" scoped>
@use "@material/button"; // allow customizing, via @include button._____
@use "@material/circular-progress";

:deep(.mdc-button) {
    @include button.ink-color(#dc2626);
    .mdc-button__ripple::before,
    .mdc-button__ripple::after {
        --mdc-text-button-hover-state-layer-color: #{#dc2626};
    }
    .mdc-circular-progress {
        @include circular-progress.color(#dc2626);
    }
}
</style>
