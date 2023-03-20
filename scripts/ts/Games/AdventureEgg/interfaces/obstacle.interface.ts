import { IGameObject } from "./game.interface";

export interface IObstacle extends IGameObject {
    image: HTMLImageElement;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
}
