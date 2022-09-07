<template>
  <div class="mdc-data-table__pagination">
    <div class="mdc-data-table__pagination-trailing" v-if="paginator">
      <div class="mdc-data-table__pagination-navigation">
        <div class="mdc-data-table__pagination-total">
          {{ paginator.from }}‑{{ paginator.to }} of {{ paginator.total }}
        </div>
        <IconButton
            class="mdc-data-table__pagination-button"
            data-first-page="true"
            :disabled="!paginator.prev_page_url"
            @click="$emit('first-page', $event)"
        >
          first_page
        </IconButton>
        <IconButton
            class="mdc-data-table__pagination-button"
            data-prev-page="true"
            :disabled="!paginator.prev_page_url"
            @click="$emit('prev-page', $event)"
        >
          chevron_left
        </IconButton>
        <IconButton
            class="mdc-data-table__pagination-button"
            data-next-page="true"
            :disabled="!paginator.next_page_url"
            @click="$emit('next-page', $event)"
        >
          chevron_right
        </IconButton>
        <IconButton
            class="mdc-data-table__pagination-button"
            data-last-page="true"
            :disabled="!paginator.next_page_url"
            @click="$emit('last-page', $event)"
        >
          last_page
        </IconButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import IconButton from '@/core/buttons/IconButton.vue';
import type { PropType } from 'vue';

const props = defineProps({
  paginator: {
    type: Object as PropType<{ [key: string]: any }|null>,
    required: true
  }
})

const emit = defineEmits(['next-page', 'prev-page', 'first-page', 'last-page'])
</script>

<style lang="scss" scoped>
</style>