<template>
  <div class="flex flex-col items-center relative">
    <h1 class="my-6 text-5xl font-thin">Register</h1>
    <Textfield v-model="form.name" :error="form.errors.name" autofocus autoselect>Name</Textfield>
    <Textfield v-model="form.email" :error="form.errors.email" autofocus autoselect>Email</Textfield>
    <Textfield v-model="form.password" type="password" :error="form.errors.password" autoselect>Password</Textfield>
    <Textfield v-model="form.password_confirmation" type="password" :error="form.errors.password_confirmation" autoselect>Confirm password</Textfield>
    <div>
      <input v-model="form.remember" type="checkbox" class="ml-3" id="remember">
      <label for="remember" class="ml-1">Remember me</label>
    </div>
    <Button @click="auth.register(form)" raised class="mt-5">Register</Button>
    <RouterLink to="login"><Button class="mt-2">Already have an account?</Button></RouterLink>
    <transition name="error-message">
      <p v-if="form.errors.message" class="bg-red-200 rounded-3xl py-3 px-4 absolute" style="bottom: -4rem;">
        {{ form.errors.message }}
      </p>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import axios, { AxiosError } from 'axios'
import Button from '../../buttons/Button.vue';
import Textfield from '../../fields/OutlinedTextfield.vue';
import { useRouter } from 'vue-router';
import { useAuth } from '.';
import { useForm } from '@/ts/store/forms';

const router = useRouter()
const auth = useAuth()

onMounted(auth.getSanctumCookie)

const form = useForm('/register', {
  id: 'registration-form',
  name: '',
  email: '',
  password: '',
  password_confirmation: '',
  remember: false,
})
</script>

<style scoped lang="scss">
@use "@/css/transitions";
</style>