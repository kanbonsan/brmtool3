import { defineStore } from 'pinia'

export const useGmapStore = defineStore('gmap', {

    state: () => ({

        center: { lat: null, lng: null },
        zoom: 10,
        bounds: { nw: { lat: null, lng: null }, se: { lat: null, lng: null } }

    })
})