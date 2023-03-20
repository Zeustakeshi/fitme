export default class ButtonMoveToTop {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.rootElement.insertAdjacentHTML("beforeend", this.html());
        this.element = document.getElementById("move-to-top");
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 20 ||
                document.documentElement.scrollTop > 20
            ) {
                this.show();
            } else {
                this.hidden();
            }
        });
    }

    show() {
        this.element.style.display = "block";
    }

    hidden() {
        this.element.style.display = "none";
    }

    html() {
        return `
        <a href="#" id="move-to-top">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                />
            </svg>
        </a>
        `;
    }
}
