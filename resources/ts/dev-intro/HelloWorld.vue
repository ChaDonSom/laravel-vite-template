	<!--
		The root <div> element allows animations to work correctly. Always give a plain root element for Page components.
		Do not post any other root elements, even comments, alongside the root <div>.
		If there are comments, conditions on the root element, or it is a nonstandard element, the page navigation
		animation can end up transitioning _out_ and not back _in_. This only happens when
		transitions are in place and in "out-in" mode, for some reason 🤷
	-->
<template>
	<div>
		<div class="text-center m-3">
			<div class="flex justify-center">
				<img :src="vite_asset('android-chrome-512x512.png')" class="m-5 w-3/12">
			</div>
			<h1 class="text-3xl sm:text-5xl md:text-7xl font-thin">{{ msg }}</h1>
			<h2 class="text-xl italic mt-3" v-if="$route.params.securityLoggedOut">
				({{ $route.params.securityLoggedOut }})
			</h2>

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
				<p v-for="message of messages" :key="message">{{ message }}</p>
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
			<div class="my-7" v-if="auth.authenticated">
				<Button @click="sendPushNotification">Send myself a push notification</Button>
			</div>
			<div class="my-7 mx-auto inline-flex flex-col items-left gap-3" v-if="forgeResponse">
				<h3>My sites:</h3>
				<p v-for="site of forgeResponse" :key="site.id">
					<a :href="`https://${site.name}`" class="flex items-center text-blue-600 visited:text-purple-600">
						<img
								:src="`https://${site.name}/android-chrome-512x512.png`"
								class="h-14 w-14"
						>	
						<span class="ml-2">
							{{
								// Transform the site name from kebab-case in the URL to Title Case for presentation
								site.name
									.split('.somero.dev')[0]
									.split('-')
									.map(word => (word.charAt(0).toUpperCase() + word.slice(1)))
									.join(' ')
							}}
						</span>
					</a>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, defineComponent, reactive, onMounted } from 'vue';
import Button from '@/ts/core/buttons/Button.vue'
import { breakpointsTailwind, useBreakpoints, useMediaQuery } from '@vueuse/core'
import { vite_asset } from '@/ts/core/utilities/build'
import workboxImage from '@/static/images/workbox-1.svg'
import logrocketImage from '@/static/images/logrocket-1.png'
import pusherImage from '@/static/images/pusher-1.png'
import vueImage from '@/static/images/vue_logo.png'
import { useAuth } from '../core/users/auth';
import { useEcho } from '../store/echo';
import axios from 'axios';

const props = defineProps({
		msg: {
			type: String,
			required: true,
		},
})

const count = ref(0)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')

const prod = import.meta.env.PROD
const baseUrl = import.meta.env.VITE_DEV_SERVER_URL

const auth = useAuth()

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
		image: vueImage
	},
	{
		title: 'Vue 3',
		link: 'https://v3.vuejs.org/',
		image: vueImage
	},
	{
		title: 'Vite',
		link: 'https://vitejs.dev',
		image: 'https://vitejs.dev/logo.svg'
	},
	{
		title: 'TypeScript',
		link: 'https://www.typescriptlang.org/',
		image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg'
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
		title: 'Material',
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
	{
		title: 'LogRocket',
		link: 'https://app.logrocket.com',
		image: logrocketImage,
	},
	{
		title: 'Pusher',
		link: 'https://pusher.com',
		image: pusherImage,
	},
])

const messages = ref([])
const echo = useEcho()
onMounted(() => {
	// The '.' in '.my-event' means we'll listen on 'my-channel' instead of 'App\Events.my-channel'
	// That way, we can mess around with this from the Pusher event creator
	echo.echo.channel('my-channel').listen('.my-event', data => {
		console.log('data: ', data)
		messages.value.push(data)
	})
})

function sendPushNotification() {
	axios.post('/api/beams/self-notification', {
		title: 'Hello World!',
		message: 'Hi there, a notification from Laravel Vite Template!'
	})
}

const forgeResponse = ref<Array<{ id: string, status: string, name: string, }>|null>(null)
onMounted(async () => {
	let response = await axios.get('/api/sites')
	forgeResponse.value = response.data.sites.filter((site: any) => {
		return site.status == 'installed' && site.name != 'default'
	})
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
