export default class Player {
    game;
    x;
    y;
    collisionX;
    collisionY;
    collisionRadius;
    speedX;
    speedY;
    dx;
    dy;
    spriteWidth;
    spriteHeight;
    spriteX;
    spriteY;
    width;
    height;
    frameX;
    frameY;
    timer;
    interval;
    fps;
    maxFrameX;
    maxFrameY;
    image;
    speedModifier;
    constructor(game, x, y) {
        this.game = game;
        this.image = new Image();
        this.image.src = "../assets/AdventureEgg/bull.png";
        this.x = x || 100;
        this.y = y || 100;
        this.collisionX = this.game.gameWidth * 0.5;
        this.collisionY = this.game.gameHeight * 0.5;
        this.collisionRadius = 40;
        this.speedX = 0;
        this.speedY = 0;
        this.speedModifier = 8;
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        this.spriteWidth = 255;
        this.spriteHeight = 255;
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;
        this.frameX = 0;
        this.frameY = 4;
        this.maxFrameX = 59;
        this.maxFrameY = 8;
        this.timer = 0;
        this.fps = this.game.fps;
        this.interval = this.fps / 1000;
    }
    restart() {
        this.x = 100;
        this.y = 100;
        this.collisionX = this.game.gameWidth * 0.5;
        this.collisionY = this.game.gameHeight * 0.5;
        this.collisionRadius = 40;
        this.speedX = 0;
        this.speedY = 0;
        this.speedModifier = 8;
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
    }
    draw() {
        this.game.ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.spriteX, this.spriteY, this.width, this.height);
        // draw a line to mouse position
        this.game.ctx.beginPath();
        this.game.ctx.moveTo(this.collisionX, this.collisionY);
        this.game.ctx.lineTo(this.game.mouse.x, this.game.mouse.y);
        this.game.ctx.stroke();
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
    update(deltaTime) {
        // delay player speed (when player move to mouse position it will be delay)
        this.dx = this.game.mouse.x - this.collisionX;
        this.dy = this.game.mouse.y - this.collisionY;
        //sprite animation
        const angle = Math.atan2(this.dy, this.dx);
        if (angle < -2.74 || angle > 2.74)
            this.frameY = 6;
        else if (angle < -1.96)
            this.frameY = 7;
        else if (angle < -1.17)
            this.frameY = 0;
        else if (angle < -0.39)
            this.frameY = 1;
        else if (angle < 0.39)
            this.frameY = 2;
        else if (angle < 1.17)
            this.frameY = 3;
        else if (angle < 1.96)
            this.frameY = 4;
        else if (angle < 2.74)
            this.frameY = 5;
        if (this.timer > this.interval) {
            this.timer = 0;
            if (this.frameX < this.maxFrameX - 1) {
                this.frameX++;
            }
            else {
                this.frameX = 0;
            }
        }
        this.timer += deltaTime;
        // sqrt(dx*dx + dy*dy)
        const distance = Math.hypot(this.dx, this.dy);
        if (distance > this.speedModifier) {
            this.speedX = this.dx / distance || 0;
            this.speedY = this.dy / distance || 0;
        }
        else {
            this.speedX = 0;
            this.speedY = 0;
        }
        this.collisionX += this.speedX * this.speedModifier;
        this.collisionY += this.speedY * this.speedModifier;
        //check collision with obstacles
        this.game.obstacles.forEach((obstacle) => {
            const { distance, dx, dy, isCollision, sumOfRadius } = this.game.checkCollision(this, obstacle);
            if (isCollision) {
                const unitX = dx / distance;
                const unitY = dy / distance;
                this.collisionX =
                    obstacle.collisionX + (sumOfRadius + 1) * unitX;
                this.collisionY =
                    obstacle.collisionY + (sumOfRadius + 1) * unitY;
            }
        });
        // horizontal boundaries
        if (this.collisionX + this.collisionRadius > this.game.gameWidth) {
            this.collisionX = this.game.gameWidth - this.collisionRadius;
        }
        else if (this.collisionX < this.collisionRadius) {
            this.collisionX = this.collisionRadius;
        }
        if (this.collisionY + this.collisionRadius > this.game.gameHeight) {
            this.collisionY = this.game.gameHeight - this.collisionRadius;
        }
        else if (this.collisionY <
            this.game.marginTop + this.collisionRadius) {
            this.collisionY = this.game.marginTop + this.collisionRadius;
        }
        this.spriteX = this.collisionX - this.width * 0.5;
        this.spriteY = this.collisionY - this.height * 0.5 - 30;
    }
}
