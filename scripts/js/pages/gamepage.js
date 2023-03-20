import App from "../layouts/app.js";
import AdventureEgg from "../Games/AdventureEgg/adventureEgg.js";

class GamePage extends App {
    constructor() {
        super();
        this.mainScreen = document.getElementById("game-wrapper");
        this.canvas = document.createElement("canvas");
        this.canvas.classList.add("canvas-game");
        this.mainScreen.appendChild(this.canvas);
        this.adventureEggGame = new AdventureEgg(this.canvas);
    }
}
const app = new GamePage();
document.addEventListener("load", () => {});
