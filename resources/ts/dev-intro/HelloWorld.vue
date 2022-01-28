<template>
	<div class="text-center m-3">
		<div class="flex justify-center">
			<img :src="vite_asset('android-chrome-512x512.png')" class="m-5 w-3/12">
		</div>
		<h1 class="text-3xl sm:text-5xl md:text-7xl font-thin">{{ msg }}</h1>

		<p>
			Recommended IDE setup:
			<a href="https://code.visualstudio.com/" target="_blank">VSCode</a>
			+
			<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank">Vetur</a>
			(or
			<a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
			if using
			<code>&ltscript setup&gt;</code>)
		</p>

		<p>See <code>README.md</code> for more information.</p>

		<p class="bg-gray-500">
			<a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a> |
			<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
		</p>

		<Button @click="count++"> Count is: {{ count }}</Button>
		<p>
			Edit
			<code>components/Testing.vue</code> to test hot module replacement. <i class="material-icons">edit</i>
		</p>
		<p>
			Production: {{ prod }}
			BASE_URL: {{ baseUrl }}
		</p>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue';
import Button from '@/ts/core/buttons/Button.vue'
import { useMediaQuery } from '@vueuse/core'
import { vite_asset } from '@/ts/core/utilities/build'

export default defineComponent({
	name: 'HelloWorld',
	props: {
		msg: {
			type: String,
			required: true,
		},
	},
	components: {
		Button,
	},
	setup: () => {
		const count = ref(0)
		const isSmallScreen = useMediaQuery('(min-width: 640px)')
		const isMediumScreen = useMediaQuery('(max-width: 768px)')
		const isLargeScreen = useMediaQuery('(max-width: 1024px)')
		
		const prod = import.meta.env.PROD
		const baseUrl = import.meta.env.VITE_DEV_SERVER_URL

		return {
			count,
			isSmallScreen,
			isMediumScreen,
			isLargeScreen,
			vite_asset,
			prod,
			baseUrl,
		}
	},
})
</script>

<style scoped lang="scss">
@use "@/css/mdc-theme";
@use "@material/typography";
@include typography.core-styles;
a {
	color: #42b983;
}
label {
	margin: 0 0.5em;
	font-weight: bold;
}
code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
