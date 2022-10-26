import { playerCount } from "@/experiments/phaser-tutorial"
import { ref } from "vue"

export const platforms = ref<Phaser.Physics.Arcade.StaticGroup | null>(null)

export const cursors = ref<Phaser.Types.Input.Keyboard.CursorKeys | null>(null)

export const players = ref<Phaser.Types.Physics.Arcade.SpriteWithDynamicBody[]>([])

export const stars = ref<Phaser.Physics.Arcade.Group | null>(null)
export const score = ref(0)
export const scoreText = ref<Phaser.GameObjects.Text | null>(null)
export const bombs = ref<Phaser.Physics.Arcade.Group | null>(null)
export const gameOver = ref(false)
export const w = ref<Phaser.Input.Keyboard.Key | null>(null)
export const a = ref<Phaser.Input.Keyboard.Key | null>(null)
export const s = ref<Phaser.Input.Keyboard.Key | null>(null)
export const d = ref<Phaser.Input.Keyboard.Key | null>(null)

export class Scene extends Phaser.Scene {
    constructor() {
        super("GameScene")
    }

    preload() {
        console.log("preload")
        this.load.image("sky", "/images/experiments/phaser-tutorial/sky.png")
        this.load.image(
            "ground",
            "/images/experiments/phaser-tutorial/platform.png"
        )
        this.load.image("star", "/images/experiments/phaser-tutorial/star.png")
        this.load.image("bomb", "/images/experiments/phaser-tutorial/bomb.png")
        this.load.spritesheet(
            "dude",
            "/images/experiments/phaser-tutorial/dude.png",
            { frameWidth: 32, frameHeight: 48 }
        )
    }
    create() {
        this.add.image(400, 300, "sky")

        scoreText.value = this.add.text(16, 16, "score: 0", {
            fontSize: "32px" /*  fill: '#000' */,
        })

        platforms.value = this.physics.add.staticGroup()

        platforms.value.create(400, 568, "ground").setScale(4).refreshBody()
        platforms.value.create(600, 400, "ground")
        platforms.value.create(50, 250, "ground")
        platforms.value.create(750, 220, "ground")

        players.value = []
        for (let i = 0; i < playerCount.value; i++) {
            players.value.push(this.physics.add.sprite(100, 450, "dude"))
            if (i != 0) players.value[i].setTint(0x00ff00)
        }

        for (let player of players.value) {
            player.setBounce(0.2)
            player.setCollideWorldBounds(true)
        }

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        })

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        })

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        })

        for (let player of players.value) {
            // @ts-ignore
            this.physics.add.collider(player, platforms.value)
        }

        cursors.value = this.input.keyboard.createCursorKeys()
        w.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W)
        a.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A)
        s.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S)
        d.value = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)

        bombs.value = this.physics.add.group()

        // @ts-ignore
        this.physics.add.collider(bombs.value, platforms.value)

        const hitBomb = (
            player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
            bomb?: any
        ) => {
            this.physics.pause()
            player.setTint(0xff0000)
            player.anims.play("turn")
            gameOver.value = true
            this.add.text(100, 300, "Game over: hit any key to restart", {
                fontSize: "32px" /*  fill: '#000' */,
            })
            const restart = () => {
                location.reload()
            }
            this.input.on("pointerdown", restart)
            this.input.keyboard.on("keydown", restart)
        }

        for (let player of players.value) {
            // @ts-ignore
            this.physics.add.collider(player, bombs.value, hitBomb, null, this)
        }

        stars.value = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        })

        stars.value.children.iterate(function (child) {
            // @ts-ignore
            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.3))
        })

        // @ts-ignore
        this.physics.add.collider(stars.value, platforms.value)

        for (let player of players.value) {
            // @ts-ignore
            this.physics.add.overlap(player, stars.value, collectStar, null, this)
        }

        function collectStar(
            player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
            star: Phaser.GameObjects.GameObject
        ) {
            // @ts-ignore
            star.disableBody(true, true)
            score.value += 1
            scoreText.value?.setText("Score: " + score.value)

            if (stars.value?.countActive(true) === 0) {
                stars.value.children.iterate(function (child) {
                    // @ts-ignore
                    child.enableBody(true, child.x, 0, true, true)
                })

                var x =
                    player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400)

                var bomb = bombs.value?.create(x, 16, "bomb")
                bomb.setBounce(1)
                bomb.setCollideWorldBounds(true)
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20)
            }
        }
    }

    update() {
        if (gameOver.value) return
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
            },
        ]
        for (let i = 0; i < players.value.length; i++) {
            let player = players.value[i]
            let control = controls[i]
            if (control.left) {
                player.setVelocityX(-160)

                player.anims.play("left", true)
            } else if (control.right) {
                player.setVelocityX(160)

                player.anims.play("right", true)
            } else {
                player.setVelocityX(0)

                player.anims.play("turn")
            }

            if (control.up && player.body.touching.down) {
                player.setVelocityY(-330)
            }
        }
    }

    disableClashingInput() {
        this.input.keyboard.enabled = false
    }
}
