export default class Dropdown {
    constructor(element, defaultValue) {
        this.element = element;
        this.toggle = this.element.querySelector(".dropdown-toggle");
        this.activeItem = this.element.querySelector(
            ".dropdown-select .dropdown-value"
        );
        this.dropdownList = this.element.querySelector(".dropdown-list");
        this.dropdownItems = [
            ...this.dropdownList.querySelectorAll(".dropdown-item"),
        ];
        this.defaultValue = defaultValue;
        this.value = defaultValue;
        this.setActiveItem(defaultValue);
        this.eventhandler();
    }

    eventhandler() {
        this.dropdownItems.forEach((dropdownItem) => {
            dropdownItem.addEventListener("click", (e) => {
                this.setActiveItem(dropdownItem.textContent);
            });
        });
    }

    setActiveItem(value) {
        if (!value || value.trim() === "") return;
        this.activeItem.textContent = value;
        this.value = value;
    }
}
