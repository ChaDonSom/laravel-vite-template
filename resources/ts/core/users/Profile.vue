<template>
  <div class="flex flex-col items-center relative">
    <h1 class="my-6 text-5xl font-thin">{{ form.name ? form.name : '??' }}'s Profile</h1>
    <Textfield v-model="form.name" :error="form.errors.name" autoselect>Name</Textfield>
    <Textfield v-model="form.email" :error="form.errors.email" autoselect>Email</Textfield>
    <SaveButton @click="form.submit('put')" :disabled="form.processing" :loading="form.processing" />

    <Button @click="changePassword">Change password</Button>

    <transition name="error-message">
      <p v-if="form.errors.message" class="bg-red-200 rounded-3xl py-3 px-4 absolute" style="bottom: -4rem;">
        {{ form.errors.message }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import SaveButton from '@/ts/core/buttons/SaveButton.vue';
import { useAuth, User } from '@/ts/core/users/auth';
import { useForm } from '@/ts/store/forms';
import Textfield from '@/ts/core/fields/OutlinedTextfield.vue';
import Button from '@/ts/core/buttons/Button.vue';
import { markRaw, ref } from 'vue';
import { useModals } from '@/ts/store/modals';
import PasswordModalVue from '@/ts/core/users/auth/PasswordModal.vue';

const auth = useAuth()

const form = useForm('/user/profile-information', JSON.parse(JSON.stringify(auth.user)) as User)

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