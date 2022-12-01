export class Menu {

    menuToggle?: HTMLElement | null;
    header?: HTMLElement | null;
    desktopMenu?: HTMLElement | null;
    toggleAccardion?: NodeListOf<Element>;

    isOpened: boolean;
    isLightHeader: boolean | undefined;
    isMobile: boolean;

    constructor () {
        this.menuToggle = document.querySelector('.js-toggle-menu')
        this.header = document.querySelector('.js-header')
        this.desktopMenu = document.querySelector('.js-collapse-menu')
        this.toggleAccardion = document.querySelectorAll('.js-collapse-menu-toggle-accardion')
        this.isLightHeader = this.header?.classList.contains('header--light')

        this.isOpened = false
        this.isMobile = window.innerWidth <= 1150

        this.attachHandlers();
    }

    attachHandlers = () => {
        this.menuToggle?.addEventListener('click', this.showMenu)
        this.toggleAccardion?.forEach((item) => {
            item?.addEventListener('click', this.showList)
        })
    }

    showMenu = () => {
        if (this.isLightHeader && !this.isMobile) {
            this.header?.classList.toggle('header--light')
        }
        if (this.isMobile) {
            document.body.classList.toggle('no-scroll')
            this.header?.classList.toggle('header--light')
        }
        this.desktopMenu?.classList.toggle('show')
        this.menuToggle?.classList.toggle('show')
        this.isOpened = !this.isOpened
    }

    showList() {
        (this as unknown as Element).closest('.header-collapse-menu__column')?.querySelector('.header-collapse-menu__column-list')?.classList.toggle('show')
    }
}
