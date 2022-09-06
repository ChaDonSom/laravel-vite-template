<template>
    <Button :disabled="disabled">
        <template v-if="!loading"> Save </template>
        <template v-else>
            <Circular small />
        </template>
        <template #trailing-icon>save</template>
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

<style lang="scss" scoped></style>
