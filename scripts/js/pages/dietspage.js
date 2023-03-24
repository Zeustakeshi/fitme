import ProductList from "../components/productList.js";
import { ProductData } from "../data/productData.js";
import App from "../layouts/app.js";

class DietsPage extends App {
    constructor() {
        super();
        this.buttonChooses = document.querySelectorAll(
            ".product-itsem-button-choose"
        );
        this.dietsData = ProductData.slice(0, 8);
        this.dietsList = new ProductList(".diets-list", this.dietsData);
        this.dietsList.render();
        this.dietsList.evenhandler();
    }
}

const app = new DietsPage();
