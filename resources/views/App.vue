<template>
	<div class="fixed top-1 left-1 flex z-10">
		<transition name="auth-buttons" mode="out-in">
			<RouterLink to="/" v-if="$route.name != 'index'">
				<Button><template #leading-icon>home</template>Home</Button>
			</RouterLink>
		</transition>
	</div>
	<div class="fixed top-1 right-1 flex z-10">
		<transition name="auth-buttons" mode="out-in">
			<Button v-if="auth.authenticated" @click="auth.logout">Log out</Button>
			<div v-else class="flex">
				<transition name="auth-buttons" mode="out-in">
					<div v-if="$route.name == 'login'">
						<RouterLink to="register">
							<Button>Register</Button>
						</RouterLink>
					</div>
					<div v-else-if="$route.name == 'register'">
						<RouterLink to="login">
							<Button>Log in</Button>
						</RouterLink>					
					</div>
					<div v-else class="flex">
						<RouterLink to="login">
							<Button>Log in</Button>
						</RouterLink>	
						<RouterLink to="register">
							<Button>Register</Button>
						</RouterLink>				
					</div>
				</transition>
			</div>
		</transition>
	</div>
	<RouterView #default="{ Component }">
		<transition name="page-navigation" mode="out-in">
			<component :is="Component" />
		</transition>
	</RouterView>
</template>

<script setup lang="ts">
import { useAuth } from '@/ts/core/users/auth';
import Button from '@/ts/core/buttons/Button.vue';
import { onMounted } from 'vue';

const auth = useAuth()

onMounted(() => {
	if (!auth.authenticated || !auth.user) {
		auth.getUser()
	}
})
</script>

<style scoped lang="scss">
.page-navigation-enter-from, .page-navigation-leave-to {
	opacity: 0;
	transform: scale(0.97);
}
.page-navigation-enter-active, .page-navigation-leave-active {
	transition: opacity 150ms ease-out, transform 150ms ease-out;
}

.auth-buttons-enter-from, .auth-buttons-leave-to {
	opacity: 0;
	transform: scale(0.9);
}
.auth-buttons-enter-active, .auth-buttons-leave-active {
	transition: opacity 200ms ease-out, transform 200ms ease-out;
}
</style>