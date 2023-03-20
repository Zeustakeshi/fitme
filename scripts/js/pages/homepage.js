import App from "../layouts/app.js";
import Banner from "../layouts/banner.js";
class HomePage extends App {
    constructor() {
        super();
        this.banner = new Banner(this.rootElement);
    }
}

const app = new HomePage();
