import ButtonMoveToTop from "./buttonMoveToTop.js";
import CheckBox from "./checkbox.js";
import Header from "./header.js";

export default class App {
    constructor() {
        this.rootElement = document.getElementById("app");
        this.buttonMoveToTop = new ButtonMoveToTop(this.rootElement);
        this.theme = localStorage.getItem("theme");
        this.buttonChangeTheme = new CheckBox(
            ".button-change-theme",
            this.theme === "dark" ? "checked" : ""
        );
        this.header = new Header(this.rootElement);
        this.buttonChangeTheme.onChange(this.handleChangeTheme.bind(this));
        this.setTheme();
    }

    handleChangeTheme(e) {
        if (e.target.checked) {
            this.theme = "dark";
            this.setTheme();
        } else {
            this.theme = "light";
            this.setTheme();
        }
    }

    setTheme() {
        if (this.theme === "dark") {
            this.rootElement.classList.add("dark-theme");
            localStorage.setItem("theme", "dark");
        } else {
            this.rootElement.classList.remove("dark-theme");
            localStorage.setItem("theme", "light");
        }
    }
}
