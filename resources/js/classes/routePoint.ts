export class RoutePoint {
    /** latitude */
    lat: number = 0.0;
    /** longitude */
    lng: number = 0.0;
    /** altitude */
    alt?: number;

    /** ポイントの位置をプロパティに持っておく */
    index?: number;
    /** 除外ポイントかどうか */
    excluded: boolean = false;
    /** ポイントの表示優先度 */
    weight: number = 1;

    id: number;

    distance: number
    routeDistance: number
    brmDistance: number

    constructor(lat: number = 0.0, lng: number = 0.0, alt?: number) {
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
    }
}
