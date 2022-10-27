<template>
  <div class="m-2 mt-4">
    <div class="mdc-select mdc-select--outlined" ref="mainRef">
      <div class="mdc-select__anchor" aria-labelledby="outlined-select-label">
        <span class="mdc-notched-outline">
          <span class="mdc-notched-outline__leading"></span>
          <span class="mdc-notched-outline__notch">
            <span id="outlined-select-label" class="mdc-floating-label">{{ label }}</span>
          </span>
          <span class="mdc-notched-outline__trailing"></span>
        </span>
        <span class="mdc-select__selected-text-container">
          <span id="demo-selected-text" class="mdc-select__selected-text">{{ optionLabelForModelValue }}</span>
        </span>
        <span class="mdc-select__dropdown-icon">
          <svg class="mdc-select__dropdown-icon-graphic" viewBox="7 10 10 5" focusable="false">
            <polygon class="mdc-select__dropdown-icon-inactive" stroke="none" fill-rule="evenodd"
              points="7 10 12 15 17 10">
            </polygon>
            <polygon class="mdc-select__dropdown-icon-active" stroke="none" fill-rule="evenodd"
              points="7 15 12 10 17 15">
            </polygon>
          </svg>
        </span>
      </div>

      <!-- Other elements from the select remain. -->
      <div class="mdc-select__menu mdc-menu mdc-menu-surface mdc-menu-surface--fullwidth">
        <ul class="mdc-deprecated-list" role="listbox" :aria-label="`${accessibilityOptionType} picker listbox`">
          <slot></slot>
          <!-- <li class="mdc-deprecated-list-item mdc-deprecated-list-item--selected" aria-selected="true" data-value=""
            role="option">
            <span class="mdc-deprecated-list-item__ripple"></span>
          </li>
          <li class="mdc-deprecated-list-item" aria-selected="false" data-value="grains" role="option">
            <span class="mdc-deprecated-list-item__ripple"></span>
            <span class="mdc-deprecated-list-item__text">
              Bread, Cereal, Rice, and Pasta
            </span>
          </li>
          <li class="mdc-deprecated-list-item mdc-deprecated-list-item--disabled" aria-selected="false"
            data-value="vegetables" aria-disabled="true" role="option">
            <span class="mdc-deprecated-list-item__ripple"></span>
            <span class="mdc-deprecated-list-item__text">
              Vegetables
            </span>
          </li>
          <li class="mdc-deprecated-list-item" aria-selected="false" data-value="fruit" role="option">
            <span class="mdc-deprecated-list-item__ripple"></span>
            <span class="mdc-deprecated-list-item__text">
              Fruit
            </span>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MDCSelect } from '@material/select'
import { computed, provide, ref, toRef, watch } from 'vue';
import SelectOption from './SelectOption.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    required: true,
  },
  label: {
    type: String,
    default: () => '',
  },
  accessibilityOptionType: {
    type: String,
    default: () => "Option"
  }
})

const emit = defineEmits([
  'update:modelValue'
])

provide('select-value', computed(() => props.modelValue))

const optionLabelForModelValue = ref('')

const mainRef = ref<HTMLElement|null>(null)
const select = ref<MDCSelect|null>(null)
watch(
  () => mainRef.value,
  () => {
    if (mainRef.value) {
      let selectedOption = mainRef.value.querySelector('li.mdc-deprecated-list-item--selected') as HTMLElement | null
      if (selectedOption) {
        if (selectedOption.innerText) optionLabelForModelValue.value = selectedOption.innerText
      }

      select.value = new MDCSelect(mainRef.value)

      select.value.listen('MDCSelect:change', () => {
        if (select.value) emit('update:modelValue', select.value.value)
      })
    }
  }
)
</script>

<style lang="scss" scoped>
@use "@/css/mdc-theme";
@use "@material/select/styles";
@use "@material/select";

.mdc-select {
    @include select.outline-shape-radius(mdc-theme.$textfield-shape-radius);
    // @include textfield.outlined-density(-4);
    @include select.outline-color((
      'default': var(--color-border),
      'hover': var(--color-border-hover)
    ));
    @include select.label-color(( 'default': var(--color-text) ));
    @include select.ink-color(( 'default': var(--color-text) ));
    @include select.dropdown-icon-color(( 'default': var(--color-text) ));
}

// Tailwind 'undo' RE MDC mess-up, recommended by Adam Wathan (fixes tons of borders showing up on focus in MDC)
*,
*::before,
*::after {
  border-width: 1px;
  border-style: none;
}
</style>
<style lang="scss">
@use "@/css/mdc-theme";
@use "@material/list/mdc-list";
@use "@material/menu-surface/mdc-menu-surface";
@use "@material/menu-surface";
@use "@material/menu/mdc-menu";

.mdc-menu {
  @include menu-surface.shape-radius(mdc-theme.$menu-shape-radius);
}
</style>