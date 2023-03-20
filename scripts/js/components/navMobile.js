export default class NavMobile {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.wrapper = document.querySelector(".nav-mobile");
        this.icon = this.wrapper.querySelector(".nav-mobile-icon");
        this.isShow = false;
        this.evenHandleler();
    }

    evenHandleler() {
        this.icon.addEventListener("click", this.show.bind(this));
    }

    handleClickButtonClose() {
        const btnClose = this.wrapper.querySelector(
            ".nav-mobile-control-button-close"
        );
        if (btnClose)
            btnClose.addEventListener("click", this.hidden.bind(this));
    }

    show() {
        this.isShow = true;
        this.wrapper.insertAdjacentHTML("afterbegin", this.html());
        this.handleClickButtonClose();
        this.buttonChangeTheme = new ButtonChangeTheme(
            this.rootElement,
            ".button-change-theme-mobile"
        );
    }

    hidden() {
        this.isShow = false;
        const content = this.wrapper.querySelector(".nav-mobile-container");
        if (content) content.remove();
    }

    html() {
        return `
        <div class="nav-mobile-container">
            <div class="nav-mobile-content">
                <div class="nav-mobile-control">
                    <span
                        class="nav-mobile-control-button-close"
                        ><svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </span>
                </div>
                <ul class="nav-mobile-list">
                    <li class="nav-item">
                        <a href="./pages/diets.html">Diets</a>
                    </li>
                    <li class="nav-item">
                        <a href="./pages/calorie.html"
                            >Calorie calculator</a
                        >
                    </li>
                    <li class="nav-item">
                        <a href="./pages/menu.html">Menu</a>
                    </li>
                    <li class="nav-item">
                        <a href="./pages/delivery.html"
                            >Delivery</a
                        >
                    </li>
                    <li class="nav-item">
                        <a href="./pages/aboutus.html"
                            >about us</a
                        >
                    </li>
                    <li class="nav-item">
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://mobidusk-blog-bba28.web.app/"
                            >Blog</a
                        >
                    </li>
                    <li class="nav-item">
                        <a href="./pages/FAQ.html">FAQ</a>
                    </li>
                </ul>
                <div class="nav-mobile-more">
                    <div class="nav-mobile-more-change-theme">
                        <span>Dark mode</span>
                        <div
                            class="button-change-theme-mobile"
                        ></div>
                    </div>
                    <div id="button-login-mobile">Sign-in</div>
                </div>
            </div>
        </div>`;
    }
}
