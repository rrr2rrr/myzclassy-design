import ymaps from 'ymaps';

export class SearchResult {
    container?: HTMLElement | null
    resultList?: HTMLElement | null
    resultMap?: HTMLElement | null
    resultMapContainer?: HTMLElement | null
    toggleResult?: HTMLElement | null
    dataContainer?: HTMLElement | null
    config: {
        zoom: number,
        position: number[]
    }
    mapIsReady: boolean

    map: any
    geoObjectsCollection: any
    mapsConstructor: any

    constructor() {
        this.container = document.querySelector('.js-result-container')
        this.resultList = this.container?.querySelector('.js-result-list')
        this.resultMap = this.container?.querySelector('.js-result-map')
        this.resultMapContainer = this.container?.querySelector('.js-result-map-contaier')
        this.toggleResult = this.container?.querySelector('.js-toggle-result')
        this.dataContainer = this.container?.querySelector('.js-data-container')


        this.mapIsReady = false
        this.geoObjectsCollection = null
        this.mapsConstructor = null
        this.map = null

        this.config = {
            zoom: 10,
            position: [0,0]
        }

        if (this.resultMapContainer) {
            this.initMap();
        }

        this.attachHandlers()
    }

    initMap = () => {
        ymaps
        .load()
        .then((maps: any) => {
            this.map = new maps.Map(this.resultMapContainer, {
                center: this.config.position,
                controls: [],
                zoom: this.config.zoom
            });
            this.mapIsReady = true;
            this.mapsConstructor = maps;
            this.geoObjectsCollection = new maps.GeoObjectCollection();
            this.map.geoObjects.add(this.geoObjectsCollection);
            this.setMapPosition();
        })
    }

    attachHandlers = () => {
        if (this.container && this.toggleResult) {
            this.toggleResult?.addEventListener('click', () => {
                this.container?.classList.toggle('search-page__container--map')
                if (this.container?.classList.contains('search-page__container--map')) {
                    this.toggleResult?.textContent = 'Показать списком'
                } else {
                    this.toggleResult?.textContent = 'Показать на карте'
                }
                setTimeout(() => {
                    this.setMapPosition();
                    this.setMark(this.config.position)
                })
            })
        }
    }

    setMapPosition = () => {
        if (this.mapIsReady) {
            this.map.setCenter(this.config.position)
            let pixelCenter = this.map.getGlobalPixelCenter(this.config.position);
            const parentSize = this.resultMapContainer?.getBoundingClientRect()
            const elem = this.dataContainer?.getBoundingClientRect()
            if (parentSize && elem && this.dataContainer) {
                const isFullWidth = parentSize.width === elem.width + (window.innerWidth - elem.width)
                pixelCenter = [
                    pixelCenter[0] - (isFullWidth ? 0 : (parentSize?.width / 2 - this.dataContainer?.offsetLeft / 2)),
                    pixelCenter[1] + (parentSize?.height / 2 - this.dataContainer?.offsetTop / 2)
                ];
                const geoCenter = this.map.options.get('projection').fromGlobalPixels(pixelCenter,  this.config.zoom);
                this.map.setCenter(geoCenter, this.config.zoom);
            }
        }
    }

    setMark = (pos: number[]) => {
        this.geoObjectsCollection.removeAll();
        this.geoObjectsCollection.add(new this.mapsConstructor.Placemark(pos, {
        }, {
            iconLayout: 'default#image',
            iconImageHref: '/images/mapPoint.png',
            iconImageSize: [43,64],
        }))
    }
}
