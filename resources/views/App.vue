<template>
	<HelloWorld msg="Hello Laravel + Vite" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import HelloWorld from '@/ts/dev-intro/HelloWorld.vue';
export default defineComponent({
	name: 'App',
	components: {
		HelloWorld,
	},
});
</script>