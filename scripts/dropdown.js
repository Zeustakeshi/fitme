export default class Dropdown {
    constructor(element) {
        this.element = element;
        this.toggle = this.element.querySelector(".dropdown-toggle");
        this.activeItem = this.element.querySelector(
            ".dropdown-select .dropdown-value"
        );
        this.dropdownList = this.element.querySelector(".dropdown-list");
        this.dropdownItems = [
            ...this.dropdownList.querySelectorAll(".dropdown-item"),
        ];
        this.eventhandler();
    }

    eventhandler() {
        this.toggle.addEventListener("change", (e) => {});
        this.dropdownItems.forEach((dropdownItem) => {
            // console.log(dropdownItem);
            dropdownItem.addEventListener("click", (e) => {
                this.setActiveItem(dropdownItem.textContent);
            });
        });
    }

    setActiveItem(value) {
        if (!value && value.trim() === "") return;
        this.activeItem.textContent = value;
    }
}
