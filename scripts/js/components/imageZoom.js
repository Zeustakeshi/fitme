export default class ImageZoom {
    constructor(rootSelector, url, alt, className = "") {
        this.className = className;
        this.url = url;
        this.root = document.querySelector(rootSelector);
        this.root.classList.add("image-zoom-wrapper");
        this.alt = alt;
        this.rootPosition = this.root.getBoundingClientRect();
        this.width = this.root.offsetWidth;
        this.height = this.root.offsetHeight;
    }

    evenHandler() {
        this.imageCover = this.root.querySelector(".image-cover");
        this.imageCover.addEventListener(
            "mousemove",
            this.handleZoomImage.bind(this)
        );
        this.imageCover.addEventListener("mouseleave", () => {
            this.image.style = `max-height: 100%; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100%;`;
        });
    }

    handleZoomImage(e) {
        this.image = this.root.querySelector(".image-zoom");
        const pX = e.pageX - this.rootPosition.left;
        const pY = e.pageY - this.rootPosition.top;

        this.image.style = `width: auto; height: auto ; max-height: unset;`;
        let imageWidth = this.image.offsetWidth;
        let imageHeight = this.image.offsetHeight;
        const spaceX = (imageWidth * 0.5 - this.width) * 2;
        const spaceY = (imageHeight * 0.5 - this.height) * 2;
        imageWidth = imageWidth + spaceX;
        imageHeight = imageHeight + spaceY;
        const ratioX = (imageWidth / this.width) * 0.5;
        const ratioY = (imageHeight / this.height) * 0.5;
        const x = pX * ratioX;
        const y = pY * ratioY;
        this.image.style = `left: ${-x}px; top: ${-y}px; width: auto; height: auto ; max-height: unset; transform: none;`;
    }

    render() {
        if (!this.root) return;
        this.root.insertAdjacentHTML("afterbegin", this.html());
        this.evenHandler();
    }

    html() {
        return `
        <img
            class = "image-zoom ${this.className}"
            src="${this.url}"
            alt="${this.alt}"
        />
        <div class="image-cover"></div>
        `;
    }
}
