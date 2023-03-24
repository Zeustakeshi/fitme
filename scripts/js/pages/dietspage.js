import App from "../layouts/app.js";

class DietsPage extends App {
    constructor() {
        super();
        this.buttonChooses = document.querySelectorAll(
            ".product-item-button-choose"
        );
        this.eventHandler();
    }
    eventHandler() {
        this.buttonChooses.forEach((buttonChoose) => {
            buttonChoose.addEventListener("click", () => {
                window.location = "../pages/productdetail.html";
            });
        });
    }
}

const app = new DietsPage();
