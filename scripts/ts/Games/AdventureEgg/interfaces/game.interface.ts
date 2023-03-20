import { IEgg } from "./egg.interface";
import { IEnemy } from "./enemy.interface";
import { ILarva } from "./larva.interface";
import { IObstacle } from "./obstacle.interface";
import { IParticle } from "./particle.interface";
import { IPLayer } from "./player.interface";

export interface IGameObject {
    draw: () => void;
    update: (deltaTime: number) => void;
    game: IGame;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
}

export type TCheckCollisionValue = {
    distance: number;
    isCollision: boolean;
    sumOfRadius: number;
    dx: number;
    dy: number;
};

export interface IGame {
    debug: boolean;
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    gameWidth: number;
    gameHeight: number;
    marginTop: number;
    obstacles: IObstacle[];
    eggs: IEgg[];
    enemies: IEnemy[];
    hatchlings: ILarva[];
    particles: IParticle[];
    gameObjects: IGameObject[];
    fps: number;
    timer: number;
    interval: number;
    player: IPLayer;
    mouse: {
        x: number;
        y: number;
        pressed: boolean;
    };

    gameover: boolean;
    score: number;
    winningScore: number;
    lostHatchlings: number;
    checkCollision: (a: IGameObject, b: IGameObject) => TCheckCollisionValue;
}
