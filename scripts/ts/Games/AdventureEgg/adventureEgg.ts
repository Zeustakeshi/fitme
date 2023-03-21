import { IEgg } from "./interfaces/egg.interface";
import { IGame, IGameObject } from "./interfaces/game.interface";
import { IObstacle } from "./interfaces/obstacle.interface";
import { IPLayer } from "./interfaces/player.interface";
import Egg from "./egg.js";
import Obstacle from "./obstacle.js";
import Player from "./player.js";
import { IEnemy } from "./interfaces/enemy.interface";
import Enemy from "./enemy.js";
import { ILarva } from "./interfaces/larva.interface";
import { IParticle } from "./interfaces/particle.interface";
import { ILevel } from "./interfaces/level.interface";
import levelData from "./levelData.js";

export default class AdventureEgg implements IGame {
    //public
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    gameWidth: number;
    gameHeight: number;
    mouse: { x: number; y: number; pressed: boolean };
    obstacles: IObstacle[];
    eggs: IEgg[];
    enemies: IEnemy[];
    hatchlings: ILarva[];
    gameObjects: IGameObject[];
    particles: IParticle[];
    levels: ILevel[];
    marginTop: number;
    fps: number;
    timer: number;
    interval: number;
    debug: boolean;
    lostHatchlings: number;
    score: number;
    winningScore: number;
    gameover: boolean;
    level: number;
    player: IPLayer;
    distanceScore: number;

    // private
    private numberOfObstacle: number;
    private numberOfEnemy: number;
    private maxEggs: number;
    private eggTimer: number;
    private eggInterval: number;
    private isWinning: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.debug = false;
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d") as CanvasRenderingContext2D;
        this.gameWidth = this.canvas.width = 1280;
        this.gameHeight = this.canvas.height = 720;
        this.marginTop = 200;
        this.mouse = {
            x: this.gameWidth * 0.5,
            y: this.gameHeight * 0.5,
            pressed: false,
        };

        this.levels = levelData;
        this.level = 0;
        this.numberOfObstacle = this.levels[this.level].numberOfObstacle;
        this.numberOfEnemy = this.levels[this.level].numberOfEnemy;
        this.maxEggs = this.levels[this.level].maxEggs;
        this.distanceScore = this.levels[this.level].distanceScore;

        this.obstacles = [];
        this.eggs = [];
        this.enemies = [];
        this.hatchlings = [];
        this.particles = [];
        this.gameObjects = [];

        this.score = 0;
        this.winningScore = this.levels[this.level].winningScore;
        this.lostHatchlings = 0;
        this.gameover = false;
        this.isWinning = false;

        this.fps = 30;
        this.timer = 0;
        this.interval = 1000 / this.fps;
        this.eggTimer = 0;
        this.eggInterval = 500;
        this.player = new Player(this);
        this.loadDefaultCanvasSetting();
        this.init();
        this.evenHandler();
        this.update(0);
    }

    checkCollision(a: IGameObject, b: IGameObject) {
        const dx = a.collisionX - b.collisionX;
        const dy = a.collisionY - b.collisionY;
        const distance = Math.hypot(dx, dy);
        const sumOfRadius = a.collisionRadius + b.collisionRadius;
        return {
            isCollision: distance < sumOfRadius,
            distance: distance,
            sumOfRadius: sumOfRadius,
            dx: dx,
            dy: dy,
        };
    }

    private init() {
        // init enemies
        for (let i = 0; i < this.numberOfEnemy; ++i) {
            this.addEnemy();
        }

        // init obstacles
        let attempt = 0;
        while (this.obstacles.length < this.numberOfObstacle && attempt < 500) {
            let testObstacle = new Obstacle(this);
            let overlap = false;

            this.obstacles.forEach((obstacle) => {
                const dx = testObstacle.collisionX - obstacle.collisionX;
                const dy = testObstacle.collisionY - obstacle.collisionY;
                const distance = Math.hypot(dx, dy);
                const sumOfRadius =
                    testObstacle.collisionRadius +
                    obstacle.collisionRadius +
                    150;
                if (distance < sumOfRadius) {
                    overlap = true;
                }
            });

            if (
                !overlap &&
                testObstacle.spriteX > 0 &&
                testObstacle.spriteX + testObstacle.width < this.gameWidth &&
                testObstacle.spriteY >
                    this.marginTop - testObstacle.collisionRadius - 80 &&
                testObstacle.spriteY + testObstacle.spriteHeight <
                    this.gameHeight
            ) {
                this.obstacles.push(testObstacle);
            }
            attempt++;
        }
    }

    private loadDefaultCanvasSetting() {
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = "white";
        this.ctx.lineWidth = 2;
        this.ctx.font = "30px Bangers";
    }

    private evenHandler() {
        // handle mouse down
        this.canvas.addEventListener("mousedown", (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = true;
        });

        //handle mouse up
        this.canvas.addEventListener("mouseup", (e) => {
            this.mouse.x = e.offsetX;
            this.mouse.y = e.offsetY;
            this.mouse.pressed = false;
        });

        //handle mouse move
        this.canvas.addEventListener("mousemove", (e) => {
            if (this.mouse.pressed) {
                this.mouse.x = e.offsetX;
                this.mouse.y = e.offsetY;
            }
        });

        window.addEventListener("keydown", (e) => {
            if (e.key === "d") {
                this.debug = !this.debug;
            } else if (e.key === "r" && this.gameover) {
                this.onStartGame();
            } else if (e.key === "n" && this.gameover && this.isWinning) {
                this.onNextLevel();
            }
        });
    }

    private addEgg() {
        this.eggs.push(new Egg(this));
    }

    private addEnemy() {
        this.enemies.push(new Enemy(this));
    }

    private drawStatusText() {
        this.ctx.save();
        this.ctx.font = "bold 32px Bangers";
        this.ctx.fillText(`Score:`, 25, 50);
        this.ctx.fillText(`Lost :`, 25, 85);
        this.ctx.font = "bold 30px Bangers";
        this.ctx.fillText(`${this.score}`, 125, 50);
        this.ctx.fillText(`${this.lostHatchlings}`, 125, 85);

        this.ctx.font = "bold 50px Bangers";
        this.ctx.fillText(`Level:`, this.gameWidth * 0.5 - 50, 50);
        this.ctx.fillText(
            `${this.levels[this.level].level}`,
            this.gameWidth * 0.5 + 100,
            50
        );

        this.ctx.restore();

        // win - lose message
        if (this.score >= this.winningScore) {
            this.gameover = true;
            this.ctx.save();
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
            this.ctx.fillRect(0, 0, this.gameWidth, this.gameHeight);
            this.ctx.fillStyle = "#fff";
            this.ctx.textAlign = "center";
            let message1 = "";
            let message2 = "";
            let message3 = "";
            if (this.winningScore - this.lostHatchlings > this.distanceScore) {
                // win
                this.isWinning = true;
                message1 = "YOU WIN !";
                message2 = `Your Score: ${this.score}`;
                message3 = "Press N to next level";
            } else {
                // lose
                message1 = "YOU LOSE !";
                message2 = `Your Score: ${this.score}`;
                message3 = "Press R to restart";
                this.isWinning = false;
            }

            this.ctx.font = "bold 100px Bangers";
            this.ctx.fillText(
                message1,
                this.gameWidth * 0.5,
                this.gameHeight * 0.5
            );
            this.ctx.font = "80px Bangers";
            this.ctx.fillText(
                message2,
                this.gameWidth * 0.5,
                this.gameHeight * 0.5 + 80
            );
            this.ctx.font = "24px Bangers";
            this.ctx.fillText(
                message3,
                this.gameWidth * 0.5,
                this.gameHeight * 0.5 + 120
            );
            this.ctx.restore();
        }
    }

    private resetGame() {
        this.level = 0;
        this.numberOfEnemy = this.levels[this.level].numberOfEnemy;
        this.numberOfObstacle = this.levels[this.level].numberOfObstacle;
        this.winningScore = this.levels[this.level].winningScore;
        this.score = 0;
        this.lostHatchlings = 0;
        this.gameover = false;
        this.isWinning = false;
        this.obstacles = [];
        this.eggs = [];
        this.enemies = [];
        this.hatchlings = [];
        this.particles = [];
        this.gameObjects = [];
        this.player.restart();
    }

    private onStartGame() {
        this.resetGame();
        this.init();
        this.update(0);
    }

    private onNextLevel() {
        const prevLevel = this.level;
        this.resetGame();
        this.level = prevLevel + 1;
        this.numberOfEnemy = this.levels[this.level].numberOfEnemy;
        this.numberOfObstacle = this.levels[this.level].numberOfObstacle;
        this.winningScore = this.levels[this.level].winningScore;
        this.init();
        this.update(0);
    }

    private removeGameObjects() {
        this.eggs = this.eggs.filter((egg) => !egg.makedForDeletetion);
        this.hatchlings = this.hatchlings.filter(
            (hatch) => !hatch.makedForDeletetion
        );
        this.particles = this.particles.filter(
            (particle) => !particle.makedForDeletion
        );
    }

    private lastime = 0;
    private update(timeStamp: number) {
        const deltaTime = timeStamp - this.lastime;
        this.lastime = timeStamp;

        if (this.timer > this.interval) {
            this.timer = 0;
            this.ctx.clearRect(0, 0, this.gameWidth, this.gameHeight);
            this.gameObjects = [
                ...this.obstacles,
                ...this.eggs,
                ...this.enemies,
                ...this.hatchlings,
                ...this.particles,
                this.player,
            ];
            this.gameObjects.sort((a: IGameObject, b: IGameObject) => {
                return a.collisionY - b.collisionY;
            });
            this.gameObjects.forEach((object) => {
                object.update(deltaTime);
                object.draw();
            });

            //add egg
            if (
                this.eggTimer > this.eggInterval &&
                this.eggs.length < this.maxEggs
            ) {
                this.addEgg();
                this.eggTimer = 0;
            } else {
                this.eggTimer += deltaTime;
            }

            // remove object
            this.removeGameObjects();

            // draw status text
            this.drawStatusText();
        }
        this.timer += deltaTime;
        if (!this.gameover) {
            requestAnimationFrame(this.update.bind(this));
        }
    }
}
