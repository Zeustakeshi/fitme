import App from "../layouts/app.js";
import Dropdown from "../components/dropdown.js";
import Form from "../components/form.js";
import Table from "../components/table.js";

const activityItems = [
    {
        label: "Sedentary: little or no exercise",
        x: 1.1997157071783937,
    },
    {
        label: "Exercise 1-3 times/week",
        x: 1.3745557924662402,
    },
    {
        label: "Exercise 4-5 times/week",
        x: 1.464818763326226,
    },
    {
        label: "Daily exercise or intense exercise 3-4 times/week",
        x: 1.5493958777540868,
    },
    {
        label: "Intense exercise 6-7 times/week",
        x: 1.7242359630419333,
    },
    {
        label: "Very intense exercise daily, or physical job",
        x: 1.8990760483297797,
    },
];

class CaloriePage extends App {
    constructor() {
        super();
        this.dropdownActivityLevelElement = document.querySelector(
            ".dropdown-active-level"
        );
        this.dropdownActivityLevel = new Dropdown(
            this.dropdownActivityLevelElement
        );
        this.tableResults = new Table(".calculator-result .table-result", {
            header: ["Activity Level", "Calorie"],
            body: activityItems.map((item) => [item.label, "0"]),
        });
        this.form = new Form(".calculator-form", this.caculator.bind(this));
    }

    caculator(values) {
        const formData = {
            gender: values[0].value ? 0 : 1,
            age: values[2].value,
            weight: values[3].value,
            height: values[4].value,
        };
        const { gender, age, weight, height } = formData;
        let resluts = 0;
        if (gender === 1) {
            resluts =
                Math.round(10 * weight + 6.25 * height - 5 * age + 5) / 1000;
        } else {
            resluts =
                Math.round(10 * weight + 6.25 * height - 5 * age - 161) / 1000;
        }

        this.rederTableResults(resluts);
    }

    rederTableResults(result) {
        const data = {
            header: ["Activity Level", "Calorie"],
            body: activityItems.map((item) => {
                return [item.label, Math.round(result * item.x * 1000) / 1000];
            }),
        };
        this.tableResults.update(data);
    }
}

const app = new CaloriePage();
document.addEventListener("load", () => {});
