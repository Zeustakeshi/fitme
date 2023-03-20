import { IGame } from "./interfaces/game.interface";
import { IParticle } from "./interfaces/particle.interface";

export default class Particle implements IParticle {
    game: IGame;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    speedX: number;
    speedY: number;
    angle: number;
    va: number;
    makedForDeletion: boolean;
    color?: string;

    constructor(game: IGame, x: number, y: number, color?: string) {
        this.game = game;
        this.collisionX = x;
        this.collisionY = y;
        this.collisionRadius = Math.floor(Math.random() * 10 + 5);
        this.speedX = Math.random() * 6 - 3;
        this.speedY = Math.random() * 2 + 0.5;
        this.angle = 0;
        this.va = Math.random() * 0.1 + 0.01;
        this.makedForDeletion = false;
        this.color = color;
    }

    draw() {
        this.game.ctx.save();
        this.game.ctx.strokeStyle = "black";
        this.game.ctx.fillStyle = this.color || "#000";
        this.game.ctx.beginPath();
        this.game.ctx.arc(
            this.collisionX,
            this.collisionY,
            this.collisionRadius,
            0,
            Math.PI * 2
        );
        this.game.ctx.fill();
        this.game.ctx.stroke();

        this.game.ctx.restore();
    }
    update() {}
}

export class Firefly extends Particle implements IParticle {
    update() {
        this.angle += this.va;
        this.collisionX += Math.cos(this.angle) * this.speedX;
        this.collisionY -= this.speedY;
        if (this.collisionY < 0) {
            this.makedForDeletion = true;
        }
    }
}

export class Spark extends Particle implements IParticle {
    update() {
        this.angle = this.va * 0.5;
        this.collisionX += Math.cos(this.angle) * this.speedX;
        this.collisionY -= Math.cos(this.angle) * this.speedY;

        if (this.collisionRadius > 0.1) this.collisionRadius -= 0.05;
        if (this.collisionRadius < 0.2 || this.collisionY < 0) {
            this.makedForDeletion = true;
        }
    }
}
