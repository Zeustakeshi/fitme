export default class Modal {
    constructor(rootElement, html) {
        this.rootElement = rootElement;
        this.conentHTML = html;
        this.animation = 2;
    }

    showModal() {
        this.rootElement.insertAdjacentHTML("afterbegin", this.html());
        this.handleClickOverlay();
        this.handleClickButtonClose();
    }

    hiddenModal() {
        this.modalElement = document.getElementById("modal");
        this.modalElement.remove();
    }

    handleClickOverlay() {
        const overlayElement = document.querySelector("#modal > .overlay ");
        overlayElement.addEventListener("click", () => {
            this.hiddenModal();
        });
    }

    handleClickButtonClose() {
        const btnClose = document.querySelector(
            "#modal .modal-container  .modal-control > .close "
        );
        btnClose.addEventListener("click", () => {
            this.hiddenModal();
        });
    }

    html() {
        return `
        <div id="modal">
            <div class="overlay"></div>
            <div class="modal-container modal-animation-${this.animation}">
                <div class = "modal-control">
                    <span class= "close"> 
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </span>
                </div>
                <div class = "modal-main"> 
                    ${this.conentHTML}
                </div>
               
            </div>
        </div>`;
    }
}
