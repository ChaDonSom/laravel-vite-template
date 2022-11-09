<img src="https://laravel-vite-template.somero.dev/android-chrome-512x512.png" height="55">

# Laravel Vite Template

This is a powerful starter kit, fine-tuned for clean code and uncompromising feature-set.

#### This kit aims to solve the problem of conflicting interests between Laravel and Vue, by separating the two.

The Vue side of the app is its own app, which communicates with the Laravel side, also its own app.

This structure allows the app, as a whole, to be more resilient to change. Laravel updates will not break Vue, nor will Vue updates mess with the Laravel side.

&nbsp;

# Stack

<a href="https://laravel.com" target="_blank" title="Laravel">
    <img src="https://laravel.com/img/logomark.min.svg" height="55">
</a> The Laravel framework is fast, clean, and filled with best practices. In this stack, it will handle the backend as an API.

&nbsp;


<a href="https://vitejs.dev" target="_blank" title="Vite">
    <img src="https://vitejs.dev/logo.svg" height="55">
</a> Vite gets our development server running - our finger on the pulse - in a split second, and hot-reloads faster than you can <code>alt+tab</code>.

&nbsp;

<a href="https://vuejs.org/" target="_blank" title="Vue 3">
    <img src="https://vuejs.org/images/logo.png" height="55">
</a> Vue 3 is powerful, fast, and lends itself to clean organization through its Composition API.

&nbsp;

<a href="https://vueuse.org/" target="_blank" title="Vue 3">
    <img src="https://d33wubrfki0l68.cloudfront.net/2f6479d73bc25170dc532dd42e059166573bf478/61057/favicon.svg" height="55">
</a> VueUse is an awesome library of <code>use</code> functions for Vue 3 Composition API that allow us to access many browser APIs reactively.

&nbsp;

<a href="https://www.typescriptlang.org/" target="_blank" title="Vue 3">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" height="55">
</a> TypeScript allows us to remember what goes where - it gives us code intellisense.

&nbsp;

<a href="https://developers.google.com/web/tools/workbox" target="_blank" title="Workbox">
    <img src="https://cdn.worldvectorlogo.com/logos/workbox-1.svg" height="55">
</a> Workbox handles the complexity of our Service Worker for us, allowing us to run code in the background while our app is closed.

&nbsp;


<a href="https://tailwindcss.com/" target="_blank" title="Tailwind">
    <img src="https://pbs.twimg.com/profile_images/1468993891584073729/a_op8KnL_400x400.jpg" height="55">
</a> Tailwind accelerates CSS development by allowing us to compose most of our CSS rules from our HTML.

&nbsp;

<a href="https://github.com/material-components/material-components-web" target="_blank" title="Material Design Components">
    <img src="https://laravel-vite-template.somero.dev/images/material_components_web_logo.png" height="55">
</a> Material Design Components provides beautiful UI components that follow Google's best practices for UI design.

&nbsp;

<a href="https://logrocket.com" target="_blank" title="LogRocket">
    <img src="https://res.cloudinary.com/practicaldev/image/fetch/s--TXdRGx5X--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/1506/e0a84c58-6a79-4f06-9149-87a38b84afa8.png" height="55">
</a> LogRocket gives us a live replay of every session on our app, with console and network logging as well.

&nbsp;

<a href="https://pusher.com" target="_blank" title="Pusher">
    <img src="https://avatars.githubusercontent.com/u/739550?s=200&v=4" height="55">
</a> Pusher allows us to utilize websocket connections, for things like live updates, as well as push notifications, to let users know when something happens and they're not in the app.

&nbsp;

&nbsp;

# Get started

```bash
cp .env.example .env

composer install
npm install
npm start
```

[View the Vue readme](./vue-readme.md)

[View the Laravel readme](./laravel-readme.md)

# Publish it

## Using Laravel Forge

**Update your nginx config:** provide two different `location` blocks: one for the frontend, one for the backend. Use explicitly-registered routes for your backend, for both legibility and safety (and because no other way works). These will replace the existing `location /` block.
```nginx
location / {
    # {{ ROOT_PATH }}/dist in a Forge Template
    root /home/user/domain.com/dist;
    try_files $uri $uri/ /index.html;
}

location ~ ^\/(api|sanctum|login|logout|register|user|_ignition|password-reset|clockwork|__clockwork).* {
    # {{ PATH }} in a Forge Template
    root /home/user/domain.com/public;
    try_files $uri $uri/ /index.php?$query_string;
}
```