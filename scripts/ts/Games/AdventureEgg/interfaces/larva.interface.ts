import { IGameObject } from "./game.interface";

export interface ILarva extends IGameObject {
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    timer: number;
    interval: number;
    fps: number;
    maxFrameX: number;
    maxFrameY: number;
    speedX: number;
    speedY: number;
    margin: number;
    makedForDeletetion: boolean;
}
