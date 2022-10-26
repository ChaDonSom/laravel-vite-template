<template>
  <div id="phaser-game" :key="gameKey" ref="phaserGameRef" class="w-full h-full flex justify-center items-center"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import Phaser from 'phaser'
import { Scene } from "@/experiments/phaser-tutorial/GameScene"

const phaserGameRef = ref(null)
const gameKey = ref(Math.random())
const game = ref<Phaser.Game | null>(null)

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    width: 800,
    height: 600
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: Scene
};


watch(
  () => phaserGameRef.value,
  () => {
    if (!phaserGameRef.value) return
    if (game.value) {
      game.value.destroy(true, false)
      game.value.canvas?.parentNode?.removeChild(game.value.canvas) //removes the old game canvas
    }
    game.value = new Phaser.Game(config)
  }
)
</script>