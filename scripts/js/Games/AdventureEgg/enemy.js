export default class Enemy {
    game;
    collisionX;
    collisionY;
    collisionRadius;
    image;
    spriteWidth;
    spriteHeight;
    spriteX;
    spriteY;
    width;
    height;
    baseSpeedX;
    baseSpeedY;
    speedX;
    speedY;
    frameX;
    frameY;
    constructor(game) {
        this.game = game;
        // this.image = document.querySelector(".enemy") as HTMLImageElement;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/toads.png";
        this.collisionX = this.game.gameWidth;
        this.collisionY =
            this.game.marginTop +
                Math.random() * (this.game.gameHeight - this.game.marginTop);
        this.collisionRadius = 30;
        this.spriteWidth = 140;
        this.spriteHeight = 260;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
        this.baseSpeedX =
            Math.random() * this.game.levels[this.game.level].enemySpeed + 0.5;
        this.baseSpeedY =
            Math.random() * this.game.levels[this.game.level].enemySpeed + 0.5;
        this.speedX = this.baseSpeedX;
        this.speedY = this.baseSpeedY;
    }
    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        // debugger
        if (this.game.debug) {
            this.game.ctx.beginPath();
            this.game.ctx.arc(this.collisionX, this.collisionY, this.collisionRadius, 0, Math.PI * 2);
            this.game.ctx.save();
            this.game.ctx.globalAlpha = 0.2;
            this.game.ctx.fill();
            this.game.ctx.restore();
            this.game.ctx.stroke();
        }
    }
    reset() {
        this.collisionX = this.game.gameWidth;
        this.collisionY =
            this.game.marginTop +
                Math.random() * (this.game.gameHeight - this.game.marginTop);
        this.speedX = Math.random() * 4 + 0.5;
        this.frameX = 0;
        this.frameY = Math.floor(Math.random() * 4);
    }
    update() {
        let collisionObjects = [this.game.player];
        collisionObjects.forEach((object) => {
            const { distance, dx, dy, isCollision, sumOfRadius } = this.game.checkCollision(this, object);
            if (isCollision) {
                const unitX = dx / distance;
                const unitY = dy / distance;
                this.collisionX = object.collisionX + (sumOfRadius + 1) * unitX;
                this.collisionY = object.collisionY + (sumOfRadius + 1) * unitY;
            }
        });
        this.collisionX -= this.speedX;
        if (this.collisionX + this.width < 0) {
            this.reset();
        }
        this.spriteX = this.collisionX - this.width * 0.3;
        this.spriteY = this.collisionY - this.height * 0.7;
    }
}
export class EggEaters extends Enemy {
}
export class EggSucker extends Enemy {
}
