/**
    data = {
        header: [];
        body: []
    }
 */

export default class Table {
    constructor(wrapperSelector, data) {
        this.amination = true;
        this.checkValidData(data);
        this.wrapperSelector = wrapperSelector;
        this.wrapper = document.querySelector(this.wrapperSelector);
        this.headerFields = [...data.header];
        this.bodyFields = [...data.body];
        this.render(this.wrapper);
    }

    checkValidData(data) {
        if (!data || !data.header || !data.body) {
            throw new Error(
                "Missing Data Error!. Header data and body data for table is require !"
            );
        }
    }

    html() {
        return `
            <table>
                <tr>
                    ${this.headerFields
                        ?.map((item) => {
                            return `<th>${item}</th>`;
                        })
                        .join("")}
                </tr>
                ${this.bodyFields
                    ?.map((item) => {
                        return `
                        <tr>
                            ${item
                                ?.map((itemContent) => {
                                    return `<td>${itemContent}</td>`;
                                })
                                .join("")}
                        </tr>
                    `;
                    })
                    .join("")}
        </table>`;
    }

    update(newData) {
        this.checkValidData(newData);
        this.headerFields = [...newData.header];
        this.bodyFields = [...newData.body];
        this.render(this.wrapper);
    }

    render(root) {
        root.innerHTML = this.html();
    }
}
