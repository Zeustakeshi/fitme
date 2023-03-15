import Dropdown from "./dropdown.js";

export default class Form {
    constructor(formSelector, onSubmit) {
        this.element = document.querySelector(formSelector);
        this.fields = [...this.element.querySelectorAll(".form-field")];
        this.values = [];
        this.onSubmit = onSubmit;
        this.evenHandler();
    }

    evenHandler() {
        this.element.addEventListener("submit", (e) => {
            e.preventDefault();
            this.values = this.fields.map((item) => {
                return {
                    name: item.name,
                    value: item.type === "radio" ? item.checked : item.value,
                };
            });
            this.onSubmit(this.values);
        });
    }

    onSubmit() {
        const results = [];
        this.fields.forEach((item) => {
            results.push({
                name: item.name,
                value: item.value,
            });
        });

        console.log(results);
    }
}

export class InputField {
    constructor(selector, name, value) {
        this.name = name;
        this.value = value;
        this.element = document.querySelector(selector);
    }
}
export class dropdownField extends Dropdown {}
export class buttonSubmit {}
