<template>
	<div class="text-center m-3">
		<div class="flex justify-center">
			<img :src="vite_asset('android-chrome-512x512.png')" class="m-5 w-3/12">
		</div>
		<h1 class="text-3xl sm:text-5xl md:text-7xl font-thin">{{ msg }}</h1>

		<div class="flex justify-center m-2">
			<p class="bg-gray-200 rounded-xl px-3 py-1">
				<a href="https://vitejs.dev/guide/features.html" target="_blank">Vite Docs</a> |
				<a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
			</p>
		</div>

		<h2 class="mt-5">Material Components:</h2>
		<div class="flex justify-center gap-5">
			<Button @click="count++" raised> Count is: {{ count }}</Button>
		</div>
		<h2 class="mt-5">Material Icons:</h2>
		<div class="flex justify-center m-4 gap-5">
			<i class="material-icons">edit</i>
			<i class="material-icons">playlist_add_check</i>
			<i class="material-icons">insert_emoticon</i>
			<i class="material-icons">keyboard_hide</i>
		</div>
		<div class="my-7">
			<h2 class="text-3xl sm:text-5xl md:text-6xl font-thin mb-3">Stack</h2>
			<div class="flex flex-row flex-wrap align-center justify-center gap-5">
				<a
						v-for="tech of stack"
						target="_blank"
						class="flex flex-col items-center justify-center gap-1"
						:key="tech.link"
						:title="tech.title"
						:href="tech.link"
				>
					<img :src="tech.image" style="height: 55px;" class="grow-0">
					{{ tech.title }}
				</a>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { ref, defineComponent, reactive } from 'vue';
import Button from '@/ts/core/buttons/Button.vue'
import { breakpointsTailwind, useBreakpoints, useMediaQuery } from '@vueuse/core'
import { vite_asset } from '@/ts/core/utilities/build'
import workboxImage from '@/static/images/workbox-1.svg'

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
		const breakpoints = useBreakpoints(breakpointsTailwind)
		const smAndLarger = breakpoints.greater('sm')
		
		const prod = import.meta.env.PROD
		const baseUrl = import.meta.env.VITE_DEV_SERVER_URL

		const stack = ref([
			{
				title: 'Laravel',
				link: 'https://laravel.com',
				image: 'https://laravel.com/img/logomark.min.svg'
			},
			{
				title: 'Laravel Vite',
				link: 'https://laravel-vite.innocenzi.dev',
				image: 'https://laravel-vite.innocenzi.dev/logo.svg',
			},
			{
				title: 'Vue Router',
				link: 'https://next.router.vuejs.org/',
				image: 'https://v3.vuejs.org/logo.png'
			},
			{
				title: 'Vue 3',
				link: 'https://v3.vuejs.org/',
				image: 'https://v3.vuejs.org/logo.png'
			},
			{
				title: 'Vite',
				link: 'https://vitejs.dev',
				image: 'https://vitejs.dev/logo.svg'
			},
			{
				title: 'Pinia',
				link: 'https://pinia.vuejs.org/',
				image: 'https://pinia.vuejs.org/logo.svg'
			},
			{
				title: 'Tailwind',
				link: 'https://tailwindcss.com/',
				image: 'https://pbs.twimg.com/profile_images/1468993891584073729/a_op8KnL_400x400.jpg'
			},
			{
				title: 'Material Design Components',
				link: 'https://github.com/material-components/material-components-web',
				image: 'https://pbs.twimg.com/profile_images/925576484122779648/ucVTUoPg_400x400.jpg'
			},
			{
				title: 'Vue Use',
				link: 'https://vueuse.org/',
				image: 'https://d33wubrfki0l68.cloudfront.net/2f6479d73bc25170dc532dd42e059166573bf478/61057/favicon.svg'
			},
			{
				title: 'Workbox',
				link: 'https://developers.google.com/web/tools/workbox',
				image: workboxImage,
			},
		])

		return {
			count,
			stack,
			smAndLarger,
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

code {
	background-color: #eee;
	padding: 2px 4px;
	border-radius: 4px;
	color: #304455;
}
</style>
