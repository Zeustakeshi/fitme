export default class Search {
    constructor(inputRoot, searchData, searchCmp, updateView) {
        this.updateView = updateView;
        this.inputRoot = inputRoot;
        this.searchData = searchData;
        this.searchCmp = searchCmp;
        this.eventHadler();
    }

    eventHadler() {
        this.inputRoot.addEventListener("change", (e) => {
            this.updateView(
                this.searchData.filter((data) => {
                    return this.searchCmp(data, e.target.value);
                })
            );
        });
    }
}
