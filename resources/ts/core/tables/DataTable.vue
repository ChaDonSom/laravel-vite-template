<template>
  <div class="mdc-data-table" ref="rootRef">
    <div class="mdc-data-table__table-container">
      <table class="mdc-data-table__table">
        <thead v-if="$slots.header">
          <tr class="mdc-data-table__header-row">
            <slot name="header" />
          </tr>
        </thead>
        <tbody class="mdc-data-table__content" v-if="$slots.body">
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {MDCDataTable} from '@material/data-table';
import { onMounted, ref } from 'vue';

const rootRef = ref(null)
const dataTable = ref<MDCDataTable|null>(null)

onMounted(() => {
  if (rootRef.value) dataTable.value = new MDCDataTable(rootRef.value);
})
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/checkbox"; // Required only for data table with row selection.
@use "@material/icon-button/styles"; // Required only for data table with column sorting.
@use "@material/data-table/data-table-theme" with (
  $shape-radius: mdc-theme.$table-shape-radius,
);
@use "@material/data-table/data-table";

// Apply both scoped and deep styles, to get to slotted elements
@include checkbox.core-styles;
@include data-table.core-styles;
@include data-table.theme-baseline;

:deep() {
  @include checkbox.core-styles;
  @include data-table.core-styles;
  @include data-table.theme-baseline;

  // Fix rounded corners in header row
  .mdc-data-table__header-row .mdc-data-table__header-cell {
    &:first-child { border-top-left-radius: mdc-theme.$table-shape-radius; }
    &:last-child  { border-top-right-radius: mdc-theme.$table-shape-radius; }
  }

  .mdc-data-table__row {
    // Fix rounded corners in last row during hover
    // The corners:
    &:last-child .mdc-data-table__cell {
      &:first-child { border-bottom-left-radius: mdc-theme.$table-shape-radius; }
      &:last-child  { border-bottom-right-radius: mdc-theme.$table-shape-radius; }
    }
    // The hovering:
    .mdc-data-table__cell { transition: background-color 100ms ease-in; }
    &:not(.mdc-data-table__row--selected):hover {
      background-color: unset;
      .mdc-data-table__cell { background-color: rgba(0, 0, 0, 0.04); }
    }
  }
}

</style>