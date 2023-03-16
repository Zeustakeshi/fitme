import Login from "./auth/login.js";
import Tooltip from "./tooltip.js";

export default class Header {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.element = document.getElementById("header");
        this.buttonShowCart = this.element.querySelector(".button-cart");
        this.buttonLogin = this.element.querySelector("#button-register");
        this.login = new Login(this.rootElement, this.buttonLogin);
    }
}
