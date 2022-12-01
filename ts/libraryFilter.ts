export const filterLibrary = () => {
    const toggleBtn = document.querySelector('.js-toggle-filter-library');
    const filter = document.querySelector('.js-library-filter');
    if (toggleBtn == null || filter === null) {
        return;
    }
    toggleBtn.addEventListener('click', () => {
        filter.classList.toggle('open');
    });
    const checkboxs = filter.querySelectorAll('input[type="checkbox"');
    const btnText = toggleBtn.querySelector('span');
    const activeCheckbox = []
    if (checkboxs && btnText) {
        checkboxs.forEach((item) => {
            item.addEventListener('change', () => {
                if (item.checked) {
                    activeCheckbox.push(item);
                } else {
                    activeCheckbox.pop();
                }
                btnText.innerText = `(${activeCheckbox.length})`
            });
        });
    }
    console.log(checkbox)
};