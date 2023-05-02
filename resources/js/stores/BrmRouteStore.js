import { defineStore } from 'pinia'
import { polyline } from '@/lib/polyline'
import { simplifyPath } from '@/lib/douglasPeucker'
import { hubeny } from '@/lib/hubeny'
import { HubenyCorrection } from '@/config.js'

import { useGmapStore } from '@/stores/GmapStore.js'
import { RoutePoint} from '@/classes/routePoint'

const simplifyParam = [
    { weight: 3, tolerance: 0.000015 },
    { weight: 5, tolerance: 0.00005 },
    { weight: 7, tolerance: 0.0002 }
]

export const useBrmRouteStore = defineStore('brmroute', {

    state: () => ({
        lastId: -1,
        points: [],
        clsPoints:[]
    }),

    getters: {

        /** simplify 用の配列（x,y) を用意 */
        pointsArray: (state) => state.points.map((pt, index) => ({ x: pt.lng ?? 0, y: pt.lat ?? 0, index })),

        /** map 内におさまるポイント */
        availablePoints: (state) => state.points.filter((pt) => {
            const gmapStore = useGmapStore()
            return gmapStore.latLngBounds.contains(pt) && pt.weight > 5
        }),

        polylinePoints: (state)=>state.points.filter(pt=>pt.weight>=5),

        /** point id からポイントインデックスを抽出 */
        getPointById: (state) => {
            return (id) => state.points.findIndex(pt => pt.id === id)
        },

    },

    actions: {
        setPoints(path) {

            const _points = polyline.decode(path)
            this.points = [...(_points.map((pt, index) => {
                return ({ ...pt, id: this.lastId + index + 1, weight: 1, distance: 0.0, routeDistance: 0.0, brmDistance: 0.0, opacity: 1.0 })
            }))]
            this.lastId += _points.length

            // ポイントウエイトを設定
            this.setWeight()

            this.setDistance()

            this.clsPoints = _points.map(()=>{})

        },
        /** ポイントウエイトのリセット / weight=10 はリセットしない */
        resetWeight() {
            this.points.forEach(pt => pt.weight = pt.weight < 10 ? 1 : pt.weight)
        },

        /**
         * ポイントウエイトの設定
         *  パラメータに従って重み付けしてマーカーを付けるかどうかを決定する
         *  max 10（キューポイント設定点や任意設定点につける）
         *  min 1
         */
        setWeight() {
            // ポイントウエイトのリセット
            this.resetWeight()

            for (const condition of simplifyParam) {
                const tolerance = condition.tolerance
                const weight = condition.weight
                const _result = simplifyPath(this.pointsArray, tolerance)
                console.log(_result.length)
                _result.forEach(pt => {
                    this.points[pt.index].weight = Math.max(this.points[pt.index].weight, weight)
                })
            }
        },
        /**
         * ポイントの距離を設定する
         *  Hubeny 計算のコストを考えて hubeny の計算範囲を指定できるようにする
         * 
         * @param {number} begin hubeny 計算の開始ポイント（index）
         * @param {number} end 同終了ポイント
         * @return {void}
         */
        setDistance(begin = -Infinity, end = Infinity) {

            const _begin = Math.max(0, begin)
            const _end = Math.min(end, this.points.length - 1)  // 最終ポイントの一つ手前まで
            const _length = this.points.length

            if (_end < _begin) {
                throw new Error('setDistance: 開始点が終了点よりあとになっています')
            }
            // 区間距離の計算
            for (let index = _begin; index < _end; index++) {
                const _current = this.points[index]
                const _next = this.points[index + 1]

                _current.distance = hubeny(_current.lat, _current.lng, _next.lat, _next.lng) * HubenyCorrection
            }
            // 距離の積算（すべての場合で再計算する）
            this.points[0].routeDistance = 0.0
            for (let index = 1; index < _length; index++) {
                const _prev = this.points[index - 1]
                this.points[index].routeDistance = _prev.routeDistance + _prev.distance
            }

            // 除外区間の計算など

            // 

        },
    }
})