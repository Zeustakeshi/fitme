import ButtonMoveToTop from "./buttonMoveToTop.js";

export default class App {
    constructor() {
        this.rootElement = document.getElementById("app");
        this.buttonMoveToTop = new ButtonMoveToTop(this.rootElement);
        this.theme = "light";
    }
}
