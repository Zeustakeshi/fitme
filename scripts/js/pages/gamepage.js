import { characters } from "../data/AdventureEggGameData.js";
import AdventureEgg from "../Games/AdventureEgg/adventureEgg.js";
import App from "../layouts/app.js";

class GamePage extends App {
    constructor() {
        super();
        this.mainScreen = document.getElementById("game-wrapper");
        this.canvas = document.createElement("canvas");
        this.gameArea = document.createElement("div");
        this.gameArea.classList.add("game-area");
        this.mainScreen.appendChild(this.gameArea);
        this.init();
        this.eventHandler();
    }

    init() {
        this.buttonFullScreen = new Button(
            "#game-wrapper",
            ["button-fullscreen"],
            this.handleFullScreen.bind(this)
        );
        this.buttonStartGame = new Button(
            "#game-wrapper",
            ["button-start-game"],
            this.handleStartGame.bind(this)
        );

        this.buttonStartGame
            .appendHTMLContent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
        <path fill-rule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clip-rule="evenodd" />
      </svg>`);

        this.buttonFullScreen.appendHTMLContent("Fullscreen");

        this.canvas.classList.add("canvas-game");

        //init character info
        this.charaterInfo = new CharacterInfoCardList(
            ".game-info-container",
            characters
        );
    }

    eventHandler() {
        this.buttonFullScreen.button.addEventListener(
            "click",
            this.handleFullScreen.bind(this)
        );
        this.buttonStartGame.button.addEventListener(
            "click",
            this.handleStartGame.bind(this)
        );
    }

    handleStartGame() {
        this.mainScreen.appendChild(this.canvas);
        this.adventureEggGame = new AdventureEgg(this.canvas);
        this.buttonStartGame.button.classList.add("hidden");
    }

    handleFullScreen() {
        if (!document.fullscreenElement) {
            this.canvas.requestFullscreen().catch((err) => {
                alert(`Error , can't enable full-screen mode: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

class CharacterInfoCardList {
    constructor(rootSelector, charaters) {
        this.root = document.querySelector(rootSelector);
        this.charaters = charaters;
        this.cards = [];
        this.initCards();
        this.render();
    }

    initCards() {
        this.charaters.forEach((charater) => {
            const { name, shortDesc, desc, imageURL } = charater;
            this.cards.push(
                new CharacterInfoCard(name, shortDesc, desc, imageURL)
            );
        });
    }

    render() {
        this.root.insertAdjacentHTML("afterbegin", this.html());
    }

    html() {
        if (this.cards.length <= 0) return;
        return this.cards
            .map((card) => {
                return `
           <div class="game-info-card-wrapper">
                <div class="game-info-card">
                    <div class="game-info-card-front">
                        <div class="game-info-img">
                            <img
                                src="${card.imageURL}"
                                alt="character"
                            />
                        </div>
                        <div class="character-info">
                            <h3 class="character-info-name">${card.name}</h3>
                            <div class="character-info-desc">
                                ${card.shortDesc}
                            </div>
                        </div>
                    </div>
                    <div class="game-info-card-back">
                        ${card.desc}
                    </div>
                </div>
            </div>`;
            })
            .join("");
    }
}

class CharacterInfoCard {
    constructor(name, shortDesc, desc, imageURL) {
        this.name = name;
        this.shortDesc = shortDesc;
        this.desc = desc;
        this.imageURL = imageURL;
    }

    html() {}
}

class Button {
    constructor(rootSelector, classNames, onClick) {
        this.root = document.querySelector(rootSelector);
        this.button = document.createElement("button");
        this.button.classList.add(...classNames);
        this.root.appendChild(this.button);
        this.onClick = onClick;
    }

    appendHTMLContent(html) {
        if (!html) return;
        this.button.insertAdjacentHTML("afterbegin", html);
    }
}

const app = new GamePage();
document.addEventListener("load", () => {});
