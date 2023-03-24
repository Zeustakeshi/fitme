import App from "../layouts/app.js";
import Dropdown from "../components/dropdown.js";
import ProductList from "../components/productList.js";
import { ProductData } from "../data/productData.js";

class MenuPage extends App {
    constructor() {
        super();
        this.dropdownFilterElement = document.querySelector(
            ".menu-filter .dropdown"
        );
        this.dropdownFilter = new Dropdown(this.dropdownFilterElement);
        this.data = ProductData;
        this.productList = new ProductList(".menu-list", this.data);
        this.productList.render();
        this.productList.evenhandler();
    }
}
const app = new MenuPage();
document.addEventListener("load", () => {});
