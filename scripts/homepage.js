import App from "./app.js";
import Banner from "./banner.js";
class HomePage extends App {
    constructor() {
        super();
        this.banner = new Banner(this.rootElement);
    }
}

const app = new HomePage();
