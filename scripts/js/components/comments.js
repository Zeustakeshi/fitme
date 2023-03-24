export default class Comments {
    constructor(rootSelector, data) {
        this.root = document.querySelector(rootSelector);
        this.data = data;
        this.comments = [];
        this.init();
    }

    render() {
        if (!this.root) return;
        this.root.insertAdjacentHTML("afterbegin", this.html());
    }

    init() {
        this.data.forEach((item) => {
            this.comments.push(new CommentItem(item.name, item.comment));
        });
    }

    html() {
        return `
        <h3 class="comment-title">Comment ( ${this.data.length} )</h3>
        <div class="comment-container">
            <ul class="comment-list">
                ${this.comments.map((item) => item.html()).join("")}
            </ul>
            <form action="" class="user-comment">
                <div class="comment-input-wrapper">
                    <input
                        class="comment-input"
                        type="text"
                        placeholder="Write your comment ..."
                    />
                </div>
                <button type="submit">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z"
                        />
                    </svg>
                </button>
            </form>
        </div>
        `;
    }
}

class CommentItem {
    constructor(name, comment) {
        this.name = name;
        this.comment = comment;
    }

    html() {
        return `
        <li>
            <h4 class="comment-user-name">${this.name}</h4>
            <p class="comment-content">
                ${this.comment}
            </p>
        </li>
        `;
    }
}
