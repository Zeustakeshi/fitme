export default class VideoYoutube {
    constructor(width = 1280, height = 720, src, title) {
        this.width = width || 1280;
        this.height = height || 720;
        this.src = src;
        this.title = title;
        this.autoplay = true;
        this.allowfullscreen = false;
    }

    html() {
        return `   
        <iframe
            width="${this.width}"
            height="${this.height}"
            src="${this.src}"
            title="${this.title}"
            frameborder="0"
            allow="accelerometer; ${
                this.autoplay ? "autoplay" : ""
            }; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            ${this.allowfullscreen ? "allowfullscreen" : ""}
        ></iframe>`;
    }
}
