export default class ButtonShowCart {
    constructor(selector) {
        this.element = document.querySelector(selector);
    }

    onClick(handleClick) {
        if (!this.element) return;
        this.element?.addEventListener("click", handleClick);
    }
}
