export default class Obstacle {
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
    frameX;
    frameY;
    constructor(game, x, y) {
        this.game = game;
        this.collisionX = x || Math.random() * this.game.gameWidth;
        this.collisionY = y || Math.random() * this.game.gameHeight;
        this.collisionRadius = 40;
        // this.image = document.querySelector(".obstacles") as HTMLImageElement;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/obstacles.png";
        this.spriteWidth = 250;
        this.spriteHeight = 250;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 80;
        this.frameX = Math.floor(Math.random() * 4);
        this.frameY = Math.floor(Math.random() * 3);
    }
    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
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
    update() { }
}
