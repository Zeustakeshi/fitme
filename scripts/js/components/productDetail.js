export default class ProductDetail {
    constructor(rootSeclector, data) {
        this.root = document.querySelector(rootSeclector);
        this.data = data;
        console.log(this.data);
        console.log(this.html());
    }

    render() {
        if (!this.root) return;
        this.root.insertAdjacentHTML("afterbegin", this.html());
    }

    html() {
        return `
        <div class="product-details-left">
            <div class="product-image skeleton">
                <img
                    src="${this.data.imgURL}"
                    alt="product-large-image"
                />
            </div>
        </div>
        <div class="product-details-right">
            <h1 class="product-name product-name--sale">${this.data.name}</h1>
            <div class="product-reviews">
                <ul class="product-rating">
                    ${new Array(this.data.ratings)
                        .fill(0)
                        .map(() => {
                            return `
                        <li class="product-rating-item">
                            <svg
                                width="18"
                                height="17"
                                viewBox="0 0 18 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                                    fill="#FFB21A"
                                ></path>
                            </svg>
                        </li>
                        
                        `;
                        })
                        .join("")}
                </ul>
                <div class="product-couter-reviews">
                    ( <span>${this.data.numberOfReviews}</span> reviews )
                </div>
            </div>
            <div class="product-desc">
                <h3>Description:</h3>
                <ul class="product-desc-list">
                        ${this.data.descriptions
                            .map((item) => `<li>${item}</li>`)
                            .join("")}
                </ul>
                <ul class="product-image-list">
                        ${this.data.images
                            .map((item, index) => {
                                return `
                            <li
                                class="product-image-item skeleton ${
                                    index === 0
                                        ? "product-image-item--active"
                                        : ""
                                }"
                            >
                                <img
                                    src="${item}"
                                    alt=""
                                />
                            </li>
                            `;
                            })
                            .join("")} 
                </ul>
            </div>
            <div class="button-group">
                <button id="button-buynow">Buy Now</button>
                <button id="button-addtocart">Add To Cart</button>
            </div>
        </div>
        
        `;
    }
}
