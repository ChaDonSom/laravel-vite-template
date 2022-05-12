<template>
  <Modal @close="internalReject">
    <template #title>{{ message ?? 'Are you sure?' }}</template>
    <template #actions>
      <div class="flex justify-between gap-5">
        <Button @click="internalReject">Cancel</Button>
        <Button raised secondary @click="internalResolve">Okay</Button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/ts/core/modals/Modal.vue';
import Button from '@/ts/core/buttons/Button.vue';
import { useModals } from '@/ts/store/modals';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  resolve: {
    type: Function,
    required: true,
  },
  reject: {
    type: Function,
    required: true,
  },
  message: {
    type: String,
    required: false,
    default: () => 'Are you sure?'
  }
})

const modals = useModals()

function internalResolve() {
  modals.close(props.id)
  props.resolve()
}

function internalReject() {
  modals.close(props.id)
  props.reject()
}
</script>

<style scoped lang="scss">
</style>