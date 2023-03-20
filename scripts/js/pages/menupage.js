import App from "../layouts/app.js";
import Dropdown from "../components/dropdown.js";

class MenuPage extends App {
    constructor() {
        super();
        this.dropdownFilterElement = document.querySelector(
            ".menu-filter .dropdown"
        );
        this.dropdownFilter = new Dropdown(this.dropdownFilterElement);
    }
}
const app = new MenuPage();
document.addEventListener("load", () => {});
