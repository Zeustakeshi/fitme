import App from "./app.js";
import Dropdown from "./dropdown.js";

class CaloriePage extends App {
    constructor() {
        super();
        this.dropdownActivityLevelElement = document.querySelector(
            ".dropdown-active-level"
        );
        this.dropdownActivityLevel = new Dropdown(
            this.dropdownActivityLevelElement
        );
    }
}

const app = new CaloriePage();
document.addEventListener("load", () => {});
