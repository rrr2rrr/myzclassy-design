import Choices from 'choices.js';

export const customSelectsInit = (select: HTMLSelectElement): void => {
    const customSelect = new Choices(select, {
        searchEnabled: false,
        shouldSort: false,
    });
};

