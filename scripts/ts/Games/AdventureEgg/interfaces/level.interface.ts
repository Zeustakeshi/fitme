export interface ILevel {
    numberOfObstacle: number;
    numberOfEnemy: number;
    numberOfSanctuary: number;
    maxEggs: number;
    level: number;
    winningScore: number;
    distanceScore: number;
    isFinal: boolean;
    enemySpeed: number;
    hatchTimer: number;
}
