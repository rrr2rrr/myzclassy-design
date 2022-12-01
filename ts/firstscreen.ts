export class FirstScreen {

    screenContainer?: HTMLElement | null;
    screenElements?: NodeListOf<HTMLElement> | null;
    currentPosition?: string | null;
    currentElementIndex: number;
    nextBtn?: HTMLElement | null;
    prevBtn?: HTMLElement | null;

    constructor() {
        this.screenContainer = document.querySelector('.js-screen')
        this.screenElements = document.querySelectorAll('.js-screen-element')
        this.nextBtn =  document.querySelector('.js-screen__next')
        this.prevBtn =  document.querySelector('.js-screen__prev')
        this.currentPosition = this.screenContainer && window.getComputedStyle(this.screenContainer as Element).transform
        this.currentElementIndex = 1
        setTimeout(() => {
            this.init()
        }, 400)
    }

    init = () => {
        this.currentPosition = this.screenContainer && window.getComputedStyle(this.screenContainer as Element).transform
        this.nextBtn?.addEventListener('click', this.next)
        this.prevBtn?.addEventListener('click', this.prev)
    }

    next = () => {
        const nextIndex = this.currentElementIndex + 1
        this.screenElements?.forEach((item) => {
            const index = item.getAttribute('data-index')
            if (index && parseInt(index) === nextIndex) {
                this.screenElements?.forEach((item) => {
                    item.classList.remove('first-screen__element--focused')
                })
                item.classList.add('first-screen__element--focused')
                this.currentElementIndex = parseInt(index)
                this.focusItem(item)
            }
        })
    }

    prev = () => {
        const prevIndex = this.currentElementIndex - 1
        this.screenElements?.forEach((item) => {
            const index = item.getAttribute('data-index')
            if (index && parseInt(index) === prevIndex) {
                this.screenElements?.forEach((item) => {
                    item.classList.remove('first-screen__element--focused')
                })
                item.classList.add('first-screen__element--focused')
                this.currentElementIndex = parseInt(index)
                this.focusItem(item)
            }
        })
    }

    focusItem = (item: HTMLElement) => {
        const index = item.getAttribute('data-index')
        const position = item.getBoundingClientRect()
        const transformValues = this.getPosition()
        this.screenContainer?.setAttribute('style', `transform: matrix(${this.currentPosition})`)
        if (transformValues) {
            if (position.x < 0 && index && parseInt(index) === 0) {
                transformValues[4] = transformValues[4] - position.left + 48
            }
            if (window.innerWidth - position.right < 0 &&  index && parseInt(index) === 2) {
                transformValues[4] = transformValues[4] + (window.innerWidth - position.right) - 48
            }
        }
        this.screenContainer?.setAttribute('style', `transform: matrix(${transformValues?.join(',')})`)
    }

    getPosition = (): number[] | undefined => {
        if (this.currentPosition) {
            const pos =  new RegExp(/matrix\((.*.)\)/gm).exec(this.currentPosition)?.[1]
            return pos?.split(',').map((item) => parseFloat(item))
        }
        return undefined
    }

}