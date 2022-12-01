import ymaps from 'ymaps';

const enum Selectors {
    SELECTED = 'school-page-map__buttons-item--selected',
    CONTAINER = 'js-map-container',
    TOGGLER = 'js-toggle-adderss',
    HOLDER = 'js-map-holder',
    DATA_CONTAINER = 'js-data-container',
}

const calcCenterPosition = ({
    map,
    pos,
    config
}: any) => {
        let pixelCenter = map.getGlobalPixelCenter(pos);
        const dataContainer = document.querySelector(`.${Selectors.DATA_CONTAINER}`)
        const offset = dataContainer?.getBoundingClientRect()
        pixelCenter = [
            pixelCenter[0] - (offset?.right ? offset?.right / 2 : 0),
            pixelCenter[1]
        ];
        const geoCenter = map.options.get('projection').fromGlobalPixels(pixelCenter,  config.zoom);
        map.setCenter(geoCenter, config.zoom);
}
export const initMap = () => {
    const mapContainer = document.querySelector(`.${Selectors.CONTAINER}`)
    const btns = mapContainer?.querySelectorAll(`.${Selectors.TOGGLER}`) || []
                 
    const mapHolder = document.querySelector(`.${Selectors.HOLDER}`)
    if (mapContainer && btns && mapHolder) {
    ymaps
        .load()
        .then((maps: any) => {
            const config = {
                zoom: 10
            }
  
            let currentPosition = null
            const points = Array.from(btns).map((item) => {
                if (item.classList.contains(Selectors.SELECTED)) {
                    const point = item.getAttribute('data-point') && JSON.parse(item.getAttribute('data-point') as string)
                    currentPosition = point
                    return point
                }
                return item.getAttribute('data-point') && JSON.parse(item.getAttribute('data-point') as string)
            })

            const map = new maps.Map(mapHolder, {
                center: currentPosition || points[0],
                controls: [],
                zoom: config.zoom
            });

            const geoObjectsCollection = new maps.GeoObjectCollection();
            map.geoObjects.add(geoObjectsCollection);
            map.behaviors.disable('scrollZoom');

            if (currentPosition) {
                geoObjectsCollection.add(new maps.Placemark(currentPosition, {
                }, {
                    iconLayout: 'default#image',
                    iconImageHref: '/images/mapPoint.png',
                    iconImageSize: [43,64],
                }))
            }
            
            calcCenterPosition({map, currentPosition: currentPosition || points[0], config})

            btns.forEach((item) => {
                item.addEventListener('click', () => {
                    const pos = item.getAttribute('data-point') && JSON.parse(item.getAttribute('data-point') as string)
                    btns.forEach((item) => {
                        item.classList.remove(Selectors.SELECTED)
                    })
                    item.classList.add(Selectors.SELECTED)

                    if (pos) {
                        map.setCenter(pos)
                        calcCenterPosition({map, pos, config})
                    }
                    
                    geoObjectsCollection.removeAll();
                    geoObjectsCollection.add(new maps.Placemark(pos, {
                    }, {
                        iconLayout: 'default#image',
                        iconImageHref: '/images/mapPoint.png',
                        iconImageSize: [43,64],
                    }))
                })
            })

        })
        .catch((error: any) => console.log('Failed to load Yandex Maps', error));
    }
}