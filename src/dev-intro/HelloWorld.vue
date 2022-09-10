<template>
    <div>
        <!--
		This element allows animations to work correctly. Always give a plain root element for Page components.
		If there are conditions on the root element, or it is a nonstandard element, the page navigation
		animation can end up transitioning _out_ and not back _in_. 
		
		Also, any comments should be made _within_ the element. Comments outside of this root element will
		also cause out-in transitions to only transition out.
	-->

        <div class="text-center m-3">
            <div class="flex justify-center">
                <img
                    src="/android-chrome-512x512.png"
                    class="m-5 w-3/12"
                />
            </div>
            <h1 class="text-3xl sm:text-5xl md:text-7xl font-thin">
                {{ msg }}
            </h1>
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
                <h2 class="text-3xl sm:text-5xl md:text-6xl font-thin mb-3">
                    Stack
                </h2>
                <div
                    class="flex flex-row flex-wrap align-center justify-center gap-5"
                >
                    <a
                        v-for="tech of stack"
                        target="_blank"
                        class="flex flex-col items-center justify-center gap-1"
                        :key="tech.link"
                        :title="tech.title"
                        :href="tech.link"
                    >
                        <img
                            :src="tech.image"
                            style="height: 55px"
                            class="grow-0"
                        />
                        {{ tech.title }}
                    </a>
                </div>
            </div>
            <div class="my-7" v-if="auth.authenticated">
                <Button @click="sendPushNotification"
                    >Send myself a push notification</Button
                >
            </div>
            <div
                class="my-7 mx-auto inline-flex flex-col items-left gap-3"
                v-if="forgeResponse"
            >
                <h3>My sites:</h3>
                <p v-for="site of forgeResponse" :key="site.id">
                    <a
                        :href="`https://${site.name}`"
                        class="flex items-center text-blue-600 visited:text-purple-600"
                    >
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
import { ref, onMounted } from "vue";
import Button from "@/core/buttons/Button.vue";
import {
    breakpointsTailwind,
    useBreakpoints,
} from "@vueuse/core";
import { useAuth } from "../core/users/auth";
import { useEcho } from "../store/echo";
import apiAxios from "@/core/utilities/axios";

const props = defineProps({
    msg: {
        type: String,
        required: true,
    },
});

const count = ref(0);
const breakpoints = useBreakpoints(breakpointsTailwind);
const smAndLarger = breakpoints.greater("sm");

const prod = import.meta.env.PROD;
const baseUrl = import.meta.env.VITE_DEV_SERVER_URL;

const auth = useAuth();

const stack = ref([
    {
        title: "Laravel",
        link: "https://laravel.com",
        image: "https://laravel.com/img/logomark.min.svg",
    },
    {
        title: "Vue 3",
        link: "https://v3.vuejs.org/",
        image: "/images/vue_logo.png",
    },
    {
        title: "Vite",
        link: "https://vitejs.dev",
        image: "https://vitejs.dev/logo.svg",
    },
    {
        title: "TypeScript",
        link: "https://www.typescriptlang.org/",
        image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    },
    {
        title: "Tailwind",
        link: "https://tailwindcss.com/",
        image: "/images/tailwind_logo.png",
    },
    {
        title: "Material",
        link: "https://github.com/material-components/material-components-web",
        image: "/images/material_components_web_logo.png",
    },
    {
        title: "Vue Use",
        link: "https://vueuse.org/",
        image: "https://d33wubrfki0l68.cloudfront.net/2f6479d73bc25170dc532dd42e059166573bf478/61057/favicon.svg",
    },
    {
        title: "Workbox",
        link: "https://developers.google.com/web/tools/workbox",
        image: "/images/workbox-1.svg",
    },
    {
        title: "LogRocket",
        link: "https://app.logrocket.com",
        image: "/images/logrocket-1.png",
    },
    {
        title: "Pusher",
        link: "https://pusher.com",
        image: "/images/pusher-1.png",
    },
]);

const messages = ref<any[]>([]);
const echo = useEcho();
onMounted(() => {
    // The '.' in '.my-event' means we'll listen on 'my-channel' instead of 'App\Events.my-channel'
    // That way, we can mess around with this from the Pusher event creator
    echo.echo.channel("my-channel").listen(".my-event", (data: any) => {
        console.log("data: ", data);
        messages.value.push(data);
    });
});

function sendPushNotification() {
    apiAxios.post("/api/beams/self-notification", {
        title: "Hello World!",
        message: "Hi there, a notification from Laravel Vite Template!",
    });
}

const forgeResponse = ref<Array<{
    id: string;
    status: string;
    name: string;
}> | null>(null);
onMounted(async () => {
    const response = await apiAxios.get("/api/sites");
    forgeResponse.value = response.data.sites.filter((site: any) => {
        return site.status == "installed" && site.name != "default";
    });
});
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
