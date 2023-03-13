import Banner from "./banner.js";
import ButtonMoveToTop from "./buttonMoveToTop.js";

class HomePage {
    constructor() {
        this.rootElement = document.getElementById("app");
        this.banner = new Banner(this.rootElement);
        this.buttonMoveToTop = new ButtonMoveToTop(this.rootElement);
    }
}

window.addEventListener("load", () => {
    const homepage = new HomePage();
});
