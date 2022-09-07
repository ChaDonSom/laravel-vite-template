<template>
  <Modal @close="modals.close(id)">
    <template #title>Change password</template>
    <Textfield v-model="form.current_password" type="password" :error="form.errors.current_password" autoselect>
      Current password
    </Textfield>
    <Textfield v-model="form.password" type="password" :error="form.errors.password" autoselect>
      New password
    </Textfield>
    <Textfield v-model="form.password_confirmation" type="password" autoselect>
      Confirm password
    </Textfield>
    <transition name="error-message">
      <p v-if="form.errors.message" class="bg-red-200 rounded-3xl py-3 px-4 absolute" style="bottom: -4rem;">
        {{ form.errors.message }}
      </p>
    </transition>
    <template #actions>
      <div class="flex justify-between gap-5">
        <SaveButton @click="submit" :loading="form.processing" :disabled="form.processing" class="ml-auto" />
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import Modal from '@/core/modals/Modal.vue';
import { useModals } from '@/store/modals';
import SaveButton from '@/core/buttons/SaveButton.vue';
import { useForm } from '@/store/forms';
import Textfield from '@/core/fields/OutlinedTextfield.vue';

const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})

const form = useForm('/user/password', {
  id: null as number|null,
  current_password: props.password,
  password: '',
  password_confirmation: ''
})

const modals = useModals()

async function submit() {
  await form.submit('put')
  modals.close(props.id)
}
</script>

<style scoped lang="scss">
</style>