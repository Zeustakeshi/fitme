import { IEgg } from "./interfaces/egg.interface";
import { IGame } from "./interfaces/game.interface";
import Larva from "./larva.js";

export default class Egg implements IEgg {
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
    margin: number;
    hatchTimer: number;
    hatchInterval: number;
    makedForDeletetion: boolean;

    constructor(game: IGame, x?: number, y?: number) {
        this.game = game;
        this.collisionRadius = 40;
        this.margin = this.collisionRadius * 2;
        this.collisionX =
            x ||
            this.margin +
                Math.random() * (this.game.gameWidth - this.margin * 2);
        this.collisionY =
            y ||
            this.game.marginTop +
                this.margin +
                Math.random() *
                    (this.game.gameHeight -
                        this.game.marginTop -
                        this.margin * 2);

        // this.image = document.querySelector(".egg") as HTMLImageElement;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/egg.png";
        this.spriteWidth = 110;
        this.spriteHeight = 135;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;

        this.frameX = 0;
        this.frameY = 0;
        this.hatchTimer = 0;
        this.hatchInterval = this.game.levels[this.game.level].hatchTimer;
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
            const { distance, dx, isCollision, sumOfRadius } =
                this.game.checkCollision(this, enemy);
            if (isCollision) {
                const unitX = dx / distance;
                this.collisionX = enemy.collisionX + (sumOfRadius + 1) * unitX;
                if (enemy.speedX === enemy.baseSpeedX) {
                    enemy.speedX += 10;
                }
            } else {
                enemy.speedX = enemy.baseSpeedX;
            }
        });

        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;

        //
        if (this.collisionX < 0) {
            this.makedForDeletetion = true;
            this.game.lostHatchlings++;
        }

        if (this.collisionY < this.game.marginTop + this.spriteHeight * 0.5) {
            this.game.hatchlings.push(
                new Larva(this.game, this.spriteX, this.spriteY)
            );
            this.makedForDeletetion = true;
        }

        // hatching
        if (this.hatchTimer > this.hatchInterval) {
            this.hatchTimer = 0;
            this.game.hatchlings.push(
                new Larva(this.game, this.spriteX, this.spriteY)
            );
            this.makedForDeletetion = true;
        }

        this.hatchTimer += deltaTime;
    }
}
