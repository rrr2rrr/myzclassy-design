import Swiper, { SwiperOptions } from 'swiper';

interface ISldier extends SwiperOptions {
    enbleHideOutsideItems?: boolean;
    goToSelector?: string;
}
// document.addEventListener('DOMContentLoaded', () => {
export const inializeSlider = (selector: string, sliderOptions?: ISldier) => {
    const { goToSelector, ...sliderOptionsForSlide } = { goToSelector: '', ...sliderOptions };
    const sliders = Array.from(document.querySelectorAll(selector)).map((item: Element) => {
        const swiperRootElement = item.querySelector('.swiper')!;
        const nextButton = item.querySelector('.js-slider-next')!;
        const prevButton = item.querySelector('.js-slider-prev')!;
        const {
            enbleHideOutsideItems,
            ...options
        } = {
            enbleHideOutsideItems: false,
            ...sliderOptionsForSlide,
        };
        const swiper = new Swiper(swiperRootElement as HTMLElement, {
            slidesPerView: 'auto',
            spaceBetween: 24,
            navigation: true,
            ...options,
            on: {
                afterInit() {
                    if (enbleHideOutsideItems) {
                        const slides = swiperRootElement.querySelectorAll('.swiper-slide');
                        const slideWidth = slides[0].getBoundingClientRect().width;
                        console.log(slideWidth)
                        const options = {
                            root: item,
                            rootMargin: `0px -${slideWidth}px 0px -${slideWidth}px`,
                            thresholds: 1,
                        };
                        const callback = function (entries: IntersectionObserverEntry[]) {
                            entries.forEach((item, i) => {
                                if (item.isIntersecting) {
                                    item.target.classList.remove('hidden');
                                } else {
                                    item.target.classList.add('hidden');

                                }
                            });
                        };
                        const observer = new IntersectionObserver(callback, options);
                        Array.from(slides).forEach((item) => {
                            observer.observe(item);
                        });
                    }
                },
                slideChange() {
                    if (goToSelector) {
                        const btns = document.querySelectorAll(goToSelector);
                        btns.forEach((item) => {
                            item.classList.remove('active');
                            btns[this.activeIndex].classList.add('active');
                        });
                        console.log(this.activeIndex);
                    }
                }
            },
        });
        nextButton.addEventListener('click', () => swiper.slideNext());
        prevButton.addEventListener('click', () => swiper.slidePrev());
        return swiper;
    });

    if (goToSelector) {
        const goTo = (e: Event) => {
            const index = (e.currentTarget as HTMLElement).getAttribute('data-index');
            console.log(index);
            if (index) {
                sliders.forEach((slider: Swiper) => slider.slideTo(+index));
            }
        };
        document.querySelectorAll(goToSelector).forEach((item) => {
            item.addEventListener('click', goTo);
        });
    }
};
