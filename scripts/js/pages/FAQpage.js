import FAQs from "../components/FAQs.js";
import App from "../layouts/app.js";

class FAQPage extends App {
    constructor() {
        super();
        this.questions = new FAQs(".FAQ-questions");
    }
}

const app = new FAQPage();
