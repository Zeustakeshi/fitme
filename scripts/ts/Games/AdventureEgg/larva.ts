import { IGame } from "./interfaces/game.interface";
import { ILarva } from "./interfaces/larva.interface";
import { Firefly, Spark } from "./paricle.js";

export default class Larva implements ILarva {
    game: IGame;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    maxFrameX: number;
    maxFrameY: number;
    speedX: number;
    speedY: number;
    margin: number;
    makedForDeletetion: boolean;
    timer: number;
    interval: number;
    fps: number;

    constructor(game: IGame, x: number, y: number) {
        this.game = game;
        this.collisionRadius = 30;
        this.margin = this.collisionRadius * 2;
        this.collisionX = x;
        this.collisionY = y;
        // this.image = document.querySelector(".larva") as HTMLImageElement;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/larva.png";
        this.spriteWidth = 150;
        this.spriteHeight = 150;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;

        this.speedX = 0;
        this.speedY = 1 + Math.random();

        this.frameX = 0;
        this.frameY = 0;
        this.maxFrameX = 0;
        this.maxFrameY = 2;
        this.timer = 0;
        this.fps = 20;
        this.interval = 200;

        this.makedForDeletetion = false;
    }

    draw() {
        this.game.ctx.drawImage(
            this.image,
            this.frameX * this.spriteWidth,
            this.frameY * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            this.spriteX,
            this.spriteY,
            this.width,
            this.height
        );

        // debugger
        if (this.game.debug) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(
                this.collisionX,
                this.collisionY,
                this.collisionRadius,
                0,
                Math.PI * 2
            );
            this.game.ctx.save();
            this.game.ctx.globalAlpha = 0.2;
            this.game.ctx.fill();
            this.game.ctx.restore();
            this.game.ctx.stroke();
        }
    }
    update(deltaTime: number) {
        this.collisionY -= this.speedY;
        if (this.collisionY < this.game.marginTop + 50) {
            this.makedForDeletetion = true;
            this.game.score++;
            for (let i = 0; i < 3; ++i) {
                this.game.particles.push(
                    new Firefly(
                        this.game,
                        this.collisionX,
                        this.collisionY,
                        "#a3e635"
                    )
                );
            }
        }
        if (this.timer > this.interval) {
            this.timer = 0;

            if (this.frameY < this.maxFrameY - 1) {
                this.frameY++;
            } else {
                this.frameY = 0;
            }

            if (this.frameX < this.maxFrameX - 1) {
                this.frameX++;
            } else {
                this.frameX = 0;
            }
        }
        this.timer += deltaTime;
        let collisionObjects = [this.game.player, ...this.game.obstacles];
        collisionObjects.forEach((object) => {
            const { distance, dx, dy, isCollision, sumOfRadius } =
                this.game.checkCollision(this, object);

            if (isCollision) {
                const unitX = dx / distance;
                const unitY = dy / distance;
                this.collisionX = object.collisionX + (sumOfRadius + 1) * unitX;
                this.collisionY = object.collisionY + (sumOfRadius + 1) * unitY;
            }
        });

        this.game.enemies.forEach((enemy) => {
            if (this.game.checkCollision(this, enemy).isCollision) {
                this.makedForDeletetion = true;
                for (let i = 0; i < 5; ++i) {
                    this.game.particles.push(
                        new Spark(
                            this.game,
                            this.collisionX,
                            this.collisionY,
                            "#ef4444"
                        )
                    );
                }
                this.game.lostHatchlings++;
            }
        });

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;
    }
}
