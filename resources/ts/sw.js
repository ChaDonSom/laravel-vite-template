importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.2.0/workbox-sw.js");

const { precacheAndRoute, cleanupOutdatedCaches } = workbox.precaching
const { clientsClaim } = workbox.core
const { registerRoute } = workbox.routing
const { CacheFirst, NetworkFirst } = workbox.strategies
const { ExpirationPlugin } = workbox.expiration
const { CacheableResponsePlugin } = workbox.cacheableResponse
// import Pusher from "pusher-js/worker";
// importScripts("https://js.pusher.com/7.0/pusher.worker.min.js");
importScripts("https://js.pusher.com/beams/service-worker.js");

self.skipWaiting()
clientsClaim()

cleanupOutdatedCaches()

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
    /^https:\/\/fonts\.googleapis\.com\/.*/i,
    new CacheFirst({
        cacheName: "google-fonts-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 31536e3, // a year
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
    }),
    "GET"
);

registerRoute(
    /\/build\/assets\/.*|^https:\/\/laravel-vite\.innocenzi\.dev\/logo\.svg|^https:\/\/v3\.vuejs\.org\/logo\.png|^https:\/\/pinia\.vuejs\.org\/logo\.svg/i,
    new CacheFirst({
        cacheName: "assets-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 5,
                maxAgeSeconds: 31536e3, // a year
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ]
    })
);

registerRoute(
    ({ url: e }) => ("/" == e.pathname || "" == e.pathname),
    new NetworkFirst({
        cacheName: "index-page-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 5,
                maxAgeSeconds: 31536e3, // a year
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
    }),
    "GET"
);

registerRoute(
    ({ url: e }) => "/api/user" == e.pathname || "api/user" == e.pathname,
    new NetworkFirst({
        cacheName: "user-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 1,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
    })
);