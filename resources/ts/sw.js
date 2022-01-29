import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

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
                maxAgeSeconds: 31536e3,
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
    }),
    "GET"
);


registerRoute(
    ({ url: e }) => ("/" == e.pathname || "" == e.pathname),
    new NetworkFirst({
        cacheName: "index-page-cache",
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 31536e3,
            }),
            new CacheableResponsePlugin({ statuses: [0, 200] }),
        ],
    }),
    "GET"
);