export class Accordeon {
    selector: string;
    toggleSelector: string;

    constructor(options: {selector: string, toggleSelector: string}) {
        this.selector = options.selector
        this.toggleSelector = options.toggleSelector
        this.init();
    }

    init = () => {
        const accordeonsArray = document.querySelectorAll(this.selector)
        accordeonsArray.forEach((item) => {
            const toggler = item.querySelector(this.toggleSelector);
            toggler?.addEventListener('click', this.toggle.bind(item))
        })
    }

    toggle(e: Event) {
        (this as unknown as HTMLElement).classList.toggle('accordeon--opened')
    }
}