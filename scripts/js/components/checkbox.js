export default class CheckBox {
    constructor(wrapperSelector, defaultValue) {
        this.defaultValue = defaultValue;
        this.wrapperElement = document.querySelector(wrapperSelector);
        this.render();
        this.input = this.wrapperElement?.querySelector("input");
    }

    render() {
        if (this.wrapperElement) {
            this.wrapperElement.innerHTML = this.html();
        }
    }

    onChange(handleChange) {
        if (!this.input) return;
        this.input.addEventListener("change", handleChange);
    }

    html() {
        return `
            <label for="theme" class="custom-check-box">
                <input id="theme" type="checkbox" ${
                    this.defaultValue === "checked" ? "checked" : ""
                }/>
                <div class="custom-check-box-background"></div>
                <div class="custom-check-box-circle"></div>
            </label>
        `;
    }
}
