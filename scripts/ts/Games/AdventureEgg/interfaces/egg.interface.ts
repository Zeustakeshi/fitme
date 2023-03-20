import { IGameObject } from "./game.interface";

export interface IEgg extends IGameObject {
    image: HTMLImageElement;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    hatchTimer: number;
    hatchInterval: number;
    makedForDeletetion: boolean;
}
