<template>
  <div class="w-screen h-screen">
    <!--
      This element allows animations to work correctly. Always give a plain root element for Page components.
      If there are conditions on the root element, or it is a nonstandard element, the page navigation
      animation can end up transitioning _out_ and not back _in_. 
      
      Also, any comments should be made _within_ the element. Comments outside of this root element will
      also cause out-in transitions to only transition out.
    -->
    <!-- <div class="text-center m-3">
      <h2 class="text-xl italic mt-3" v-if="$route.params.securityLoggedOut">
        ({{ $route.params.securityLoggedOut }})
      </h2>

      <div class="my-7">
        <p v-for="message of messages" :key="message">{{ message }}</p>
      </div>
      <div class="my-7" v-if="auth.authenticated">
        <Button @click="sendPushNotification">Send myself a push notification</Button>
      </div>
    </div> -->
    <div id="phaser-game" :key="gameKey" ref="phaserGameRef" class="w-full h-full"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Button from "@/core/buttons/Button.vue";
import { useAuth } from "@/core/users/auth";
import { useEcho } from "@/store/echo";
import apiAxios from "@/core/utilities/axios";
import Phaser from 'phaser'

const auth = useAuth();

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

const phaserGameRef = ref(null)
const gameKey = ref(Math.random())
const game = ref<Phaser.Game | null>(null)
const platforms = ref<Phaser.Physics.Arcade.StaticGroup | null>(null)

const cursors = ref<Phaser.Types.Input.Keyboard.CursorKeys | null>(null)

const players = ref<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]>([])

const stars = ref<Phaser.Physics.Arcade.Group | null>(null)
const score = ref(0);
const scoreText = ref<Phaser.GameObjects.Text | null>(null);
const bombs = ref<Phaser.Physics.Arcade.Group | null>(null)
const gameOver = ref(false)
const w = ref<Phaser.Input.Keyboard.Key | null>(null)
const a = ref<Phaser.Input.Keyboard.Key | null>(null)
const s = ref<Phaser.Input.Keyboard.Key | null>(null)
const d = ref<Phaser.Input.Keyboard.Key | null>(null)

class Scene extends Phaser.Scene {
  constructor() {
    super('GameScene')
  }

  preload() {
    this.load.image('sky', 'experiments/phaser-tutorial/sky.png');
    this.load.image('ground', 'experiments/phaser-tutorial/platform.png');
    this.load.image('star', 'experiments/phaser-tutorial/star.png');
    this.load.image('bomb', 'experiments/phaser-tutorial/bomb.png');
    this.load.spritesheet('dude',
      'experiments/phaser-tutorial/dude.png',
      { frameWidth: 32, frameHeight: 48 }
    );
  }
  create() {
    this.add.image(400, 300, 'sky');

    scoreText.value = this.add.text(16, 16, 'score: 0', { fontSize: '32px',/*  fill: '#000' */ });

    platforms.value = this.physics.add.staticGroup();

    platforms.value.create(400, 568, 'ground').setScale(4).refreshBody();
    platforms.value.create(600, 400, 'ground');
    platforms.value.create(50, 250, 'ground');
    platforms.value.create(750, 220, 'ground');

    players.value.push(this.physics.add.sprite(100, 450, 'dude'))
    players.value.push(this.physics.add.sprite(100, 450, 'dude'))
    players.value[1].setTint(0x00ffff);
    players.value[0].setTint(0x00ff00);

    for (let player of players.value) {
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
    }

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    for (let player of players.value) {
      // @ts-ignore
      this.physics.add.collider(player, platforms.value);
    }

    cursors.value = this.input.keyboard.createCursorKeys();
    w.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    a.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    s.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    d.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    bombs.value = this.physics.add.group();

    // @ts-ignore
    this.physics.add.collider(bombs.value, platforms.value);

    const hitBomb = (player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, bomb?: any) => {
      this.physics.pause();
      player.setTint(0xff0000);
      player.anims.play('turn');
      gameOver.value = true;
    }

    for (let player of players.value) {
      // @ts-ignore
      this.physics.add.collider(player, bombs.value, hitBomb, null, this);
    }

    stars.value = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.value.children.iterate(function (child) {
      // @ts-ignore
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3));
    });

    // @ts-ignore
    this.physics.add.collider(stars.value, platforms.value);

    for (let player of players.value) {
      // @ts-ignore
      this.physics.add.overlap(player, stars.value, collectStar, null, this);
    }

    function collectStar(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, star: Phaser.GameObjects.GameObject) {
      // @ts-ignore
      star.disableBody(true, true);
      score.value += 1;
      scoreText.value?.setText('Score: ' + score.value);

      if (stars.value?.countActive(true) === 0) {
        stars.value.children.iterate(function (child) {
          // @ts-ignore
          child.enableBody(true, child.x, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        var bomb = bombs.value?.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      }
    }
  }

  update() {
    // console.log('update')
    let controls = [
      {
        left: cursors.value?.left.isDown,
        right: cursors.value?.right.isDown,
        up: cursors.value?.up.isDown,
        down: cursors.value?.down.isDown,
      },
      {
        left: a.value?.isDown,
        right: d.value?.isDown,
        up: w.value?.isDown,
        down: s.value?.isDown,
      }
    ]
    for (let i = 0; i < players.value.length; i++) {
      let player = players.value[i]
      let control = controls[i]
      if (control.left) {
        player.setVelocityX(-160);

        player.anims.play('left', true);
      }
      else if (control.right) {
        player.setVelocityX(160);

        player.anims.play('right', true);
      }
      else {
        player.setVelocityX(0);

        player.anims.play('turn');
      }

      if (control.up && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  }
}

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
    if (game.value) game.value.destroy(true)
    game.value = new Phaser.Game(config);
  }
)
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
