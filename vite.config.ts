import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import process from "node:process";

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
    const enableSW = process.env.VITE_ENABLE_SERVICE_WORKER;
    return defineConfig({
        publicDir: "./src/static",
        plugins: [
            vue(),
            VitePWA({
                strategies: "injectManifest",
                devOptions: {
                    enabled: enableSW == "true", // Enable to test the service worker
                    type: "classic",
                },
                // base: "/",
                filename: "sw.js",
                registerType: "autoUpdate",
                scope: "/",
                srcDir: "./src",
                injectManifest: {
                    swDest:
                        mode == "production" ? "dist/sw.js" : "dist/dev-sw.js",
                },
                manifest: {
                    id: (process.env.VITE_APP_NAME ?? "")
                        .split(" ")
                        .map(
                            (str) => str.charAt(0).toLowerCase() + str.slice(1)
                        )
                        .join("-"),
                    name: process.env.VITE_APP_NAME,
                    short_name: process.env.VITE_PWA_SHORT_NAME,
                    description: process.env.VITE_PWA_DESCRIPTION,
                    theme_color: process.env.VITE_PWA_THEME_COLOR,
                    start_url: "/?standalone=true",
                    icons: [
                        {
                            src: "android-chrome-192x192.png",
                            sizes: "192x192",
                            type: "image/png",
                        },
                        {
                            src: "android-chrome-512x512.png",
                            sizes: "512x512",
                            type: "image/png",
                        },
                        {
                            src: "android-chrome-512x512.png",
                            sizes: "512x512",
                            type: "image/png",
                            // "purpose": "any maskable"
                            // Use this if your icon can take the cropping (Laravel-Vite's icon can't)
                        },
                    ],
                },
            }),
        ],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
        server: {
            port: Number(
                process.env.VITE_DEV_SERVER_URL?.split(":")?.[2] ?? 3000
            ),
            proxy: {
                "^/(api|sanctum|login|logout|register|user|_ignition|password-reset|clockwork|__clockwork).*":
                    process.env.VITE_API_URL ?? "http://localhost",
            },
        },
    });
};
