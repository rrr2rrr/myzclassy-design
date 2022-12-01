import ymaps from 'ymaps';

export const initParentMap = () => {
    const mapBlock = document.querySelector('.js-parent-map');
    if (mapBlock) {
        ymaps
            .load()
            .then((maps: any) => {
                const config = {
                    zoom: 14
                }
                
                const map = new maps.Map(mapBlock, {
                    center: [53.356211, 83.711626],
                    controls: [],
                    zoom: config.zoom
                });
                const geoObjectsCollection = new maps.GeoObjectCollection();
                map.geoObjects.add(geoObjectsCollection);
                map.behaviors.disable('scrollZoom');
                const parentBtn = document.querySelector('.js-toggle-parent-map');
                const pickBlock = document.querySelector('.js-pick-map');
                const pickCard = document.querySelector('.js-pick-card');
                const pickFilter = document.querySelector('.js-pick-filter');
                if (parentBtn) {
                    parentBtn.addEventListener('click', () => {
                        mapBlock.classList.add('long');
                        pickCard.classList.add('open');
                        pickFilter.classList.add('open');
                        map.container.fitToViewport();
                        pickBlock.style.display = 'none';
                        geoObjectsCollection.removeAll();
                        geoObjectsCollection.add(new maps.Placemark([53.364116, 83.712465], {
                        }, {
                            iconLayout: 'default#image',
                            iconImageHref: '/images/mapPoint.png',
                            iconImageSize: [43,64],
                        }))
                    });
                }
            })
            .catch((error: any) => console.log('Failed to load Yandex Maps', error));
    }
};