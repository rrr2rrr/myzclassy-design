export class Footer {

  footerToggle?: NodeListOf<Element>;

  isMobile: boolean;

  constructor() {
    this.footerToggle = document.querySelectorAll('.js-toggle-footer');
    this.isMobile = window.innerWidth <= 767

    this.attachHandlers();
  }

  attachHandlers = () => {
    this.footerToggle?.forEach((item) => {
      item?.addEventListener('click', this.showList)
    })
  }

  showList() {
    (this as unknown as Element).closest('.js-toggle-footer-menu')?.classList.toggle('open')
  }
}
