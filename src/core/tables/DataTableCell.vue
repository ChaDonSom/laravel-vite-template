<template>
    <td
        scope="row"
        class="mdc-data-table__cell"
        :class="{ 'mdc-data-table__cell--numeric': numeric }"
    >
        <slot></slot>
    </td>
</template>

<script lang="ts" setup>
defineProps({
    numeric: {
        type: Boolean,
        required: false,
        default: () => false,
    },
});
</script>

<style scope lang="scss"></style>
