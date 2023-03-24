import App from "../layouts/app.js";
import Dropdown from "../components/dropdown.js";

class MenuPage extends App {
    constructor() {
        super();
        this.dropdownFilterElement = document.querySelector(
            ".menu-filter .dropdown"
        );
        this.dropdownFilter = new Dropdown(this.dropdownFilterElement);
        this.buttonChooses = document.querySelectorAll(
            ".product-item-button-choose"
        );

        this.evenHandler();
    }

    evenHandler() {
        this.buttonChooses.forEach((buttonChoose) => {
            buttonChoose.addEventListener("click", () => {
                window.location = "../pages/productdetail.html";
            });
        });
    }
}
const app = new MenuPage();
document.addEventListener("load", () => {});
