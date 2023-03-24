import ProductList from "../components/productList.js";
import { ProductData } from "../data/productData.js";
import App from "../layouts/app.js";
import Banner from "../layouts/banner.js";
class HomePage extends App {
    constructor() {
        super();
        this.banner = new Banner(this.rootElement);
        this.popularData = ProductData.slice(0, 4);
        this.popularList = new ProductList(
            ".product-popular-wrapper",
            this.popularData
        );
        this.popularList.render();
        this.popularList.evenhandler();
    }
}

const app = new HomePage();
