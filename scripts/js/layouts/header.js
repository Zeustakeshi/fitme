import Login from "../auth/login.js";

export default class Header {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.element = document.getElementById("header");
        this.buttonShowCart = this.element.querySelector(".button-cart");
        this.buttonLogin = this.element.querySelector("#button-login");
        this.login = new Login(this.rootElement, this.buttonLogin);
    }
}
