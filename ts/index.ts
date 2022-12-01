import { CatalogFilter } from './CatalogFilter';
import { ClassToggler } from './catalogListToggler';
import { inializeSlider } from './sliderAutoWidth';
import { initMap } from './maps';
import { Accordeon } from './accordeon';
import { SearchResult } from './searchResult';
import { searchPageToggleFilter } from './searchPageToggleFilter';
import { FirstScreen } from './firstscreen';
import { Menu } from './menu';
import { Footer } from './footer';
import { customSelectsInit } from './customSelect';
import { initParentMap } from './parent-map';
import { filterLibrary } from './libraryFilter';

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Sliders
     */
    inializeSlider('.js-slider-auto-width', {
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-producer-content-slider');

    inializeSlider('.js-articles-slider');

    inializeSlider('.js-item-page-slider', {
        spaceBetween: 0,
        goToSelector: '.js-item-page-slider-to',
    });

    inializeSlider('.js-catalog-item-slider', {
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-producer-catalog-slider', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-analysis-slider', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-lifehack-slider', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-note-slider', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-school-image-slider', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-school-page-program-slide', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-school-page-program-graduate', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-school-page-program-collective', {
        spaceBetween: 16,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-home-page-teach-slider', {
        spaceBetween: 24,
        enbleHideOutsideItems: true,
    });

    inializeSlider('.js-home-page-school-slider', {
        spaceBetween: 20,
        enbleHideOutsideItems: true,
    });

    /**
     * Catalog list toggle
     */
    new ClassToggler({
        changeClassOnSelector: {
            '.js-catalog-list': {
                flat: 'catalog-list--flat',
                row: 'catalog-list--row',
            },
            '.js-catalog-item': {
                flat: 'catalog-item--flat',
                row: 'catalog-item--row',
            },
        },
        handleSelector: '.js-toggle-list',
        handleSelectorCurrentClass: 'catalog-title-btns__item--current',
    });

    /**
     * Catalog Filter
     */
    new CatalogFilter({
        toggleSelector: '.js-toggle-filter',
        filterSelector: '.js-filter',
        togglefilterList: '.js-toggle-filter-list',
        filterList: '.js-filter-list',
    });

    initMap()

    new Accordeon({
        selector: '.js-accordeon',
        toggleSelector: '.js-accordeon-toggle'
    })

    new SearchResult();

    new FirstScreen();

    new Menu();

    new Footer();

    searchPageToggleFilter();

    const selects = document.querySelectorAll('select');
    selects.forEach((select) => {
        customSelectsInit(select);
    });

    filterLibrary();

    initParentMap();


});
