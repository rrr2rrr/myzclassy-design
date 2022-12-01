export const searchPageToggleFilter = () => {
    const btns = document.querySelectorAll('.js-toggle-show-filter')
    const filter = document.querySelector('.js-search-page-filter')
    const body = document.body
    if (btns) {
        btns.forEach((btn) => {
            btn.addEventListener('click', () => {
                filter?.classList.toggle('show')
                body?.classList.toggle('no-scroll')
            })
        })
    }
}