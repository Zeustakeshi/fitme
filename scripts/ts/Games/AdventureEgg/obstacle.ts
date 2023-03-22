import { IGame, IGameObject } from "./interfaces/game.interface";
import { IObstacle, ISanctuary } from "./interfaces/obstacle.interface";

export default class Obstacle implements IObstacle {
    game: IGame;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    scale: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    constructor(game: IGame, x?: number, y?: number) {
        this.game = game;
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.collisionX = x || Math.random() * this.game.gameWidth;
        this.collisionY =
            y ||
            Math.random() * (this.game.gameHeight - this.spriteWidth) +
                this.game.marginTop;
        this.collisionRadius = 40;
        // this.image = document.querySelector(".obstacles") as HTMLImageElement;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/obstacles.png";

        this.scale = 1;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 80;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
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
    update() {}
}

export class Sanctuary extends Obstacle implements ISanctuary {
    safeAreaRadius: number;

    constructor(game: IGame, x?: number, y?: number) {
        super(game, x, y);
        this.image.src = "../assets/AdventureEgg/sanctuary_mushroom.png";
        this.scale = 0.5;
        this.spriteWidth = 650;
        this.spriteHeight = 589;
        this.width = this.spriteWidth * this.scale;
        this.height = this.spriteHeight * this.scale;
        this.safeAreaRadius = 150;
        this.collisionRadius = 50;
        this.frameY = 0;
        this.frameX = 0;
    }

    draw() {
        super.draw();

        this.game.ctx.beginPath();
        this.game.ctx.arc(
            this.spriteX + this.width * 0.5,
            this.spriteY + this.height * 0.5,
            this.safeAreaRadius,
            0,
            Math.PI * 2
        );

        this.game.ctx.save();
        this.game.ctx.globalAlpha = 0.1;
        this.game.ctx.fillStyle = "yellow";
        this.game.ctx.fill();
        this.game.ctx.restore();
        if (this.game.debug) {
            this.game.ctx.stroke();
        }
    }

    checkCollisionSafeArea(obj: IGameObject) {
        const dx = this.collisionX - obj.collisionX;
        const dy = this.collisionY - obj.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadius = this.safeAreaRadius + obj.collisionRadius;
        return {
            isCollision: distance < sumOfRadius,
            distance: distance,
            sumOfRadius: sumOfRadius,
            dx: dx,
            dy: dy,
        };
    }

    update() {
        super.update();
        let collisionObjects = [...this.game.enemies, ...this.game.hatchlings];

        collisionObjects.forEach((object) => {
            const { distance, dx, dy, isCollision, sumOfRadius } =
                this.checkCollisionSafeArea(object);

            if (isCollision) {
                const unitX = dx / distance;
                const unitY = dy / distance;
                object.collisionX = this.collisionX + (sumOfRadius + 1) * unitX;
                object.collisionY = this.collisionY + (sumOfRadius + 1) * unitY;
            }
        });
    }
}
