import FAQData from "../data/FAQData.js";

export default class FAQs {
    constructor(rootSelector) {
        this.data = FAQData;
        this.root = document.querySelector(rootSelector);
        this.questions = [];
        this.initQuestion();
        this.render();
    }

    initQuestion() {
        this.data.forEach((item, index) => {
            this.questions.push(
                new FAQItem(this.root, index + 1, item.question, item.answer)
            );
        });
    }

    render() {
        if (!this.root) return;
        this.root.insertAdjacentHTML("afterbegin", this.html());
        this.questions.forEach((question) => {
            question.eventHandler();
        });
    }

    html() {
        return `
        <ul class="FAQ-list">
            ${this.questions.map((question) => question.html()).join("")}
        </ul>
        `;
    }
}

class FAQItem {
    constructor(root, id, question, answer) {
        this.id = id;
        this.root = root;
        this.question = question;
        this.answer = answer;
        this.isActive = false;
    }

    eventHandler() {
        if (!this.root) return;
        this.ref = this.root.querySelector(`.FAQ-item-${this.id}`);
        this.ref.addEventListener("click", () => {
            if (this.isActive) {
                this.ref.classList.remove("FAQ-item--active");
            } else {
                this.ref.classList.add("FAQ-item--active");
            }
            this.isActive = !this.isActive;
        });
    }

    html() {
        return `
        <li class="FAQ-item FAQ-item-${this.id}">
            <div class="content">
                <h3 class="question">
                    ${this.question}
                </h3>
                <p class="answer">
                    ${this.answer}
                </p>
            </div>
            <button class="button-toggle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                </svg>
            </button>
        </li>
        `;
    }
}
