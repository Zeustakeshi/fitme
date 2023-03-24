import Comments from "../components/comments.js";
import ProductDetail from "../components/productDetail.js";
import { ProductData } from "../data/productData.js";
import App from "../layouts/app.js";

class ProductDetailPage extends App {
    constructor() {
        super();
        this.productInfo = this.getProductInfo();
        this.productdetail = new ProductDetail(
            "#product-details",
            this.productInfo
        );
        this.comments = new Comments("#comment", this.productInfo.comments);
        this.productdetail.render();
        this.comments.render();
    }

    getProductInfo() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get("id");
        return ProductData[productId - 1];
    }
}

const productdetail = new ProductDetailPage();
