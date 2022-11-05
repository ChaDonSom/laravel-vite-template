<template>
  <div class="flex flex-col items-center relative">
    <h1 class="my-6 text-5xl font-thin">{{ form.name ? form.name : '??' }}'s Profile</h1>
    <Textfield v-model="form.name" :error="form.errors.name" autoselect>Name</Textfield>
    <Textfield v-model="form.email" :error="form.errors.email" autoselect>Email</Textfield>
    <SaveButton @click="submit" :disabled="form.processing" :loading="form.processing" />

    <Button @click="changePassword">Change password</Button>

    <transition name="error-message">
      <p v-if="form.errors.message" class="bg-red-200 rounded-3xl py-3 px-4 absolute text-red-800" style="bottom: -4rem;">
        {{ form.errors.message }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import SaveButton from '@/core/buttons/SaveButton.vue';
import { useAuth, type User } from '@/core/users/auth';
import { useForm } from '@/store/forms';
import Textfield from '@/core/fields/OutlinedTextfield.vue';
import Button from '@/core/buttons/Button.vue';
import { markRaw, ref } from 'vue';
import { useModals } from '@/store/modals';
import PasswordModalVue from '@/core/users/auth/PasswordModal.vue';

const auth = useAuth()

const form = useForm('/user/profile-information', JSON.parse(JSON.stringify(auth.user)) as User)

async function submit() {
  await form.submit('put')
  auth.user = JSON.parse(JSON.stringify(form.internalForm))
}

const modals = useModals()
function changePassword() {
  modals.open({
    modal: markRaw(PasswordModalVue),
    props: {
      password: ''
    }
  })
}
</script>

<style scoped lang="scss">
</style>