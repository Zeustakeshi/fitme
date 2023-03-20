import { IGameObject } from "./game.interface";

export interface IEnemy extends IGameObject {
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    baseSpeedX: number;
    baseSpeedY: number;
    speedX: number;
    speedY: number;
}
