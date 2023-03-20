import Modal from "../components/modal.js";
import VideoYoutube from "../components/videoYoutube.js";

export default class Banner {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.buttonShowIntoVideo = document.querySelector(
            "#banner .button-watch-video"
        );
        this.introvideo = new VideoYoutube(
            1280,
            720,
            "https://www.youtube.com/embed/xyQY8a-ng6g",
            "How the food you eat affects your brain - Mia Nacamulli"
        );
        this.modal = new Modal(this.rootElement, this.introvideo.html());
        this.eventHandler();
    }

    eventHandler() {
        this.handleShowIntroVideo();
    }

    handleShowIntroVideo() {
        this.buttonShowIntoVideo.addEventListener("click", () => {
            this.modal.showModal();
        });
    }
}
