import { IGame, IGameObject } from "./game.interface";

export interface IPLayer extends IGameObject {
    image: HTMLImageElement;
    game: IGame;
    x: number;
    y: number;
    collisionX: number;
    collisionY: number;
    collisionRadius: number;
    dx: number;
    dy: number;
    spriteWidth: number;
    spriteHeight: number;
    spriteX: number;
    spriteY: number;
    width: number;
    height: number;
    frameX: number;
    frameY: number;
    maxFrameX: number;
    maxFrameY: number;
    timer: number;
    interval: number;
    fps: number;
    restart: () => void;
}
