import { IGameObject } from "./game.interface";

export interface IParticle extends IGameObject {
    speedX: number;
    speedY: number;
    angle: number;
    va: number;
    makedForDeletion: boolean;
    color?: string;
}
