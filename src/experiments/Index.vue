<template>
  <div class="m-10">
    <h1 class="text-lg my-5">Experiments</h1>
    <div class="flex flex-wrap gap-10">
      <RouterLink :to="{ name: 'phaser-tutorial-start' }">
        <div class="inline-flex flex-col bg-slate-500 rounded-xl items-center justify-center p-3">
          <div class="inline-flex w-12 h-12 items-center justify-center">
            <img class="object-cover w-6 h-8" src="/images/experiments/phaser-tutorial/dude.png" />
          </div>
          <h2 class="text-slate-100 text-center">Phaser Tutorial</h2>
        </div>
      </RouterLink>
    </div>
  </div>
</template>