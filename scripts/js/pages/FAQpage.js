import FAQs from "../components/FAQs.js";
import Search from "../components/search.js";
import FAQData from "../data/FAQData.js";
import App from "../layouts/app.js";

class FAQPage extends App {
    constructor() {
        super();
        this.searchInput = document.getElementById("search-questions");
        this.questions = new FAQs(".FAQ-questions");
        this.search = new Search(
            this.searchInput,
            FAQData,
            this.searchCmp,
            this.questions.upDate.bind(this.questions)
        );
    }

    searchCmp(data, searchValues) {
        return (
            data.question
                .toLowerCase()
                .includes(searchValues.toLowerCase().trim()) ||
            data.answer
                .toLowerCase()
                .includes(searchValues.toLowerCase().trim())
        );
    }
}

const app = new FAQPage();
