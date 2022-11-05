<template>
    <div class="flex flex-col items-center relative">
        <h1 class="my-6 text-5xl font-thin">Login</h1>
        <Textfield
            v-model="form.email"
            :error="form.errors.email"
            autofocus
            autoselect
            >Email</Textfield
        >
        <Textfield
            v-model="form.password"
            type="password"
            :error="form.errors.password"
            autoselect
            >Password</Textfield
        >
        <div>
            <MdcSwitch
                v-model="form.remember"
            >Remember me</MdcSwitch>
        </div>
        <Button
            @click="auth.login(form)"
            raised
            :disabled="form.processing"
            class="mt-5"
            >Log in</Button
        >
        <RouterLink to="register"
            ><Button class="mt-2">Don't have an account?</Button></RouterLink
        >
        <transition name="error-message">
            <p
                v-if="form.errors.message"
                class="bg-red-200 rounded-3xl py-3 px-4 absolute text-red-800"
                style="bottom: -4rem"
            >
                {{ form.errors.message }}
            </p>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Button from "../../buttons/Button.vue";
import Textfield from "../../fields/OutlinedTextfield.vue";
import { useRouter } from "vue-router";
import { useAuth } from "@/core/users/auth";
import { useForm } from "@/store/forms";
import MdcSwitch from "../../switches/MdcSwitch.vue";

const router = useRouter();
const auth = useAuth();

onMounted(auth.getSanctumCookie);

const form = useForm("/login", {
    id: "login-form",
    email: "",
    password: "",
    remember: false,
});
</script>

<style scoped lang="scss">
@use "@/css/transitions";
</style>
