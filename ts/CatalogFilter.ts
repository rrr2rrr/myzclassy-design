interface ICatalogFilter {
    toggleSelector: string;
    filterSelector: string;
    togglefilterList: string;
    filterList: string;
}

export class CatalogFilter {

    private toggleSelector;
    private filterSelector;
    private togglefilterListSelector;
    private filterListSelector;

    constructor(parameters: ICatalogFilter) {
        const { toggleSelector, filterSelector, togglefilterList, filterList } = parameters;
        this.toggleSelector = toggleSelector;
        this.filterSelector = filterSelector;
        this.togglefilterListSelector = togglefilterList;
        this.filterListSelector = filterList;
        this.attuchHandlers();
    }

    private attuchHandlers = () => {
        document.querySelectorAll(this.toggleSelector).forEach((item) => {
            item.addEventListener('click', this.toggleFilter);
        });
        document.querySelectorAll(this.togglefilterListSelector).forEach((item) => {
            item.addEventListener('click', this.toggleFilterList);
        });
    }

    private toggleFilter = () => {
        document.querySelectorAll(this.toggleSelector).forEach((item) => {
            item.classList.toggle('opened');
        });
        document.querySelectorAll(this.filterSelector).forEach((item) => {
            item.classList.toggle('opened');
        });
    }

    private toggleFilterList = (e: Event) => {
        if (window.innerWidth <= 1150) {
            const target = e.currentTarget as HTMLElement;
            target.classList.toggle('opened');
            target.parentNode?.querySelector(this.filterListSelector)?.classList.toggle('opened');
        }
    }
}
