export default class Tooltip {
    constructor(wrapperSelector, position, html) {
        this.wrapper = document.querySelector(wrapperSelector);
        this.position = position;
        this.htmlContent = html;
        this.render();
    }

    update(isOpen) {
        if (isOpen) {
            this.render();
        }
    }

    remove() {
        this.e;
    }

    render() {
        if (!this.wrapper) return;
        this.wrapper.innerHTML = this.html();
    }

    html() {
        return `
            <span class="arrow-top"></span>
            <div class="tooltip-content">
                <p>
                    ${this.htmlContent}
                </p>
            </div>`;
    }
}
