import { defineConfig } from "laravel-vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig()
	.withPlugin(vue)
	.withPlugins(...VitePWA({
		devOptions: {
			enabled: false, // Enable to test the service worker
		},
		workbox: {
			globPatterns: ["**\/*.{js,css,html,php}"],
			cleanupOutdatedCaches: true,
			navigateFallback: 'index.php',
			runtimeCaching: [
				{
					urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
					handler: 'CacheFirst',
					options: {
					cacheName: 'google-fonts-cache',
					expiration: {
						maxEntries: 10,
						maxAgeSeconds: 60 * 60 * 24 * 365 // <== 365 days
					},
					cacheableResponse: {
						statuses: [0, 200]
					}
					}
				},
				{
					urlPattern: ({ url }) => url.pathname == '/',
					handler: 'NetworkOnly',
				},
			]
		},
		base: '/',
		filename: process.env.APP_ENV == 'production' ? 'sw.js' : 'dev-sw.js',
		registerType: 'autoUpdate',
		scope: '/',
		outDir: 'public',
		includeAssets: ['index.php'],
		manifest: {
			id: (process.env.APP_NAME).split(' ').map(str => str.charAt(0).toLowerCase() + str.slice(1)).join('-'), 
			name: process.env.APP_NAME,
			short_name: process.env.PWA_SHORT_NAME,
			description: process.env.PWA_DESCRIPTION,
			theme_color: process.env.PWA_THEME_COLOR,
			start_url: '/?standalone=true',
			icons: [
				{
					"src": "android-chrome-192x192.png",
					"sizes": "192x192",
					"type": "image/png"
				},
				{
					"src": "android-chrome-512x512.png",
					"sizes": "512x512",
					"type": "image/png"
				},
				{
					"src": "android-chrome-512x512.png",
					"sizes": "512x512",
					"type": "image/png",
					"purpose": "any maskable"
				}
			]
		}
	}));
