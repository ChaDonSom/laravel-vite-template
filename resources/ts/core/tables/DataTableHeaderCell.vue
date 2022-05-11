<template>
  <th
      ref="mainRef"
      class="mdc-data-table__header-cell"
      :class="thClasses"
      @click="thClick"
      :key="thUpdateKey"
      v-bind="thBindableAttributes"
  >
    <template v-if="sortable">
      <div class="mdc-data-table__header-cell-wrapper">
        <button
            v-if="numeric"
            class="mdc-icon-button material-icons mdc-data-table__sort-icon-button"
            aria-label="Sort by dessert"
            :aria-describedby="`sort-status-label-${uid}`"
        >
          arrow_upward
        </button>
        <div class="mdc-data-table__header-cell-label">
          <slot></slot>
        </div>
        <button
            v-if="!numeric"
            class="mdc-icon-button material-icons mdc-data-table__sort-icon-button"
            aria-label="Sort by dessert"
            :aria-describedby="`sort-status-label-${uid}`"
        >
          arrow_upward
        </button>
        <div class="mdc-data-table__sort-status-label" aria-hidden="true" :id="`sort-status-label-${uid}`"></div>
      </div>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </th>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { thUpdateKey } from '@/ts/core/tables/store';

const props = defineProps({
  numeric: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  sortable: {
    type: Boolean,
    required: false,
    default: () => false,
  },
  sort: {
    type: Object,
    required: false,
  },
  columnId: {
    type: String,
    default: () => 'dessert'
  }
})

const mainRef = ref<HTMLTableCellElement|null>(null)
const uid = ref(Math.round(Math.random() * 10000000))

function thClick() {
  setTimeout(() => thUpdateKey.value++)
}
const thClasses = computed(() => {
  console.log('thClasses')
  let x = thUpdateKey.value
  return {
    'mdc-data-table__header-cell--numeric': props.numeric,
    'mdc-data-table__header-cell--with-sort': props.sortable,
    'mdc-data-table__header-cell--sorted': props.sortable && props.sort?.value != 'none',
    'mdc-data-table__header-cell--sorted-descending': props.sortable && props.sort?.value == 'descending',
  }
})
const thBindableAttributes = computed(() => {
  let x = thUpdateKey.value
  let result: { [key: string]: string } = {}

  if (props.sortable) {
    result['aria-sort'] = props.sort?.value ?? 'none' // 'ascending' or 'descending' based on sort order
    result['data-column-id'] = props.columnId
  }

  return result
})
</script>

<style scoped lang="scss">
/**
  We have to help out the DataTable component here by applying its styles. For some reason,
  DataTable's styles will only apply when not scoped (not even using :deep)
 */

@use "@/css/mdc-theme";
@use "@material/checkbox"; // Required only for data table with row selection.
@use "@material/icon-button/icon-button"; // Required only for data table with column sorting.
@use "@material/data-table/data-table-theme" with (
  $shape-radius: mdc-theme.$table-shape-radius,
);
@use "@material/data-table/data-table";

@include checkbox.core-styles;
@include icon-button.core-styles;
@include data-table.core-styles;
@include data-table.theme-baseline;
</style>