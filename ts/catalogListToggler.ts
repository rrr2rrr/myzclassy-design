interface ToggleOptions {
    [key: string]: {[key: string]: string};
}
interface IAttachEvents {
    changeClassOnSelector: ToggleOptions;
    handleSelector: string;
    handleSelectorCurrentClass: string;
}

export class ClassToggler {
    private changeClassOnSelector: ToggleOptions;
    private handleSelectorCurrentClass: string;
    private handleSelector: string;

    constructor(params: IAttachEvents) {
        const { changeClassOnSelector, handleSelector, handleSelectorCurrentClass } = params;
        this.changeClassOnSelector = changeClassOnSelector;
        this.handleSelector = handleSelector;
        this.handleSelectorCurrentClass = handleSelectorCurrentClass;
        this.attachEvents();
    }

    public attachEvents = () => {
        document.querySelectorAll(this.handleSelector).forEach((item) => {
            item.addEventListener('click', this.toggleClass);
        });
    }

    private toggleClass = (e: Event) => {
        const targetElement = e.currentTarget as HTMLElement;
        const type = targetElement.getAttribute('data-type')!;
        document.querySelectorAll(this.handleSelector).forEach((item) => {
            item.classList.remove(this.handleSelectorCurrentClass);
        });
        targetElement.classList.add(this.handleSelectorCurrentClass);
        Object.keys(this.changeClassOnSelector).forEach((item) => {
            document.querySelectorAll(item).forEach((element) => {
                const keyClasses = this.changeClassOnSelector[item];
                Object.entries(keyClasses).forEach(([, value]) => {
                    element.classList.remove(value);
                });
                element.classList.add(keyClasses[type]);
            });
        });
    }
}
