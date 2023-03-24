export default class ProductList {
    constructor(rootSelector, data) {
        this.root = document.querySelector(rootSelector);
        this.data = data;
        this.productItems = [];
        this.initItem();
    }

    evenhandler() {
        this.productItems.forEach((item) => {
            const buttonChoose = this.root.querySelector(
                `.product-item-${item.id} .product-item-button-choose`
            );

            buttonChoose.addEventListener("click", () => {
                window.location.href = `../pages/productdetail.html?id=${item.id}`;
            });
        });
    }

    render() {
        this.root.insertAdjacentHTML("beforeend", this.html());
    }

    initItem() {
        this.data.forEach((item) => {
            const { id, name, desc, imgURL, calories } = item;
            this.productItems.push(
                new ProductItem(id, imgURL, name, desc, calories)
            );
        });
    }

    html() {
        return `
        <ul class="product-list">
            ${this.productItems.map((item) => item.html()).join("")}
        </ul>
        `;
    }
}

class ProductItem {
    constructor(id, imgURL, name, desc, calorieData) {
        this.id = id;
        this.CalorieList = new CalorieList(calorieData);
        this.imgURL = imgURL;
        this.name = name;
        this.desc = desc;
    }

    html() {
        return `
        <li class="product-item product-item-${this.id}">
            <div class="product-item-image skeleton">
                <img
                    src="${this.imgURL}"
                    alt="product-image"
                />
            </div>
            <div class="product-item-info">
                <h5 class="product-item-name">${this.name}</h5>
                ${this.CalorieList.html()}
                <p class="product-item-desc">
                    ${this.desc}
                </p>
                <button class="product-item-button-choose">
                    Choose
                </button>
            </div>
        </li>
        
        `;
    }
}

class CalorieList {
    constructor(calorieData) {
        this.data = calorieData;
    }

    html() {
        return `
        <ul class="product-item-kcal-list">
            ${this.data
                .map((item) => {
                    return ` 
                <li>
                    <span class="kcal-value">${item}</span>
                    <span>kcal</span>
                </li>`;
                })
                .join("")}   
        </ul>`;
    }
}
