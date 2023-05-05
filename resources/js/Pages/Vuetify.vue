<script>
import Layout from "@/Layouts/MainLayout.vue"

export default {
    layout: Layout,
}
</script>

<script setup>
import { ref, watch, onMounted, computed } from "vue"
import { storeToRefs } from "pinia"
import { Head } from "@inertiajs/vue3"
import { GoogleMap, Marker, Polyline } from "vue3-google-map"
import brm from "../../sample/sample1000.brm.json"

import { useBrmRouteStore } from "@/stores/BrmRouteStore"
import { useGmapStore } from "@/stores/GmapStore"
import circle from '../../images/pointCircle.png'

//import CustomModal from "@/Components/CustomModal"

import { debounce } from "lodash"

const props = defineProps(["canLogin", "canRegister"])

const apiKey = ref(import.meta.env.VITE_GOOGLE_MAPS_KEY)
const center = ref({ lat: 35.2418, lng: 137.1146 })

const store = useBrmRouteStore()

const availablePoints = computed(()=>store.availablePoints)
const polyReady = ref(false)

const gmapStore = useGmapStore()

const gmap = ref(null)
const poly = ref(null)

const show = ref(true)

const polylineOption = ref({
    path: [],
    strokeColor: "red",
    strokeWeight: 1,
})

const message = ref("")

store.$subscribe((mutation, state) => {
    console.log("changed", mutation.type)
})

onMounted(() => {
    setTimeout(() => {
        store.deviate()
        console.log('deviated')
    }, 5000)
    setTimeout(() => {
        store.deviate()
        console.log('deviated')
    }, 10000)

    setTimeout(()=>{
        console.log('polyReady')
        polyReady.value=true
    },1000)
})


watch(
    () => gmap.value?.ready,
    (ready) => {
        if (!ready) {
            return
        }
        console.log('ready1')
        const map = gmap.value.map
        gmapStore.map = map
        store.setPoints(brm.encodedPathAlt)

        map.addListener(
            "bounds_changed",
            debounce(() => {
                const _bb = map.getBounds()
                const _sw = _bb.getSouthWest()
                const _ne = _bb.getNorthEast()
                gmapStore.bounds = {
                    north: _ne.lat(),
                    south: _sw.lat(),
                    east: _ne.lng(),
                    west: _sw.lng(),
                }
                gmapStore.latLngBounds = map.getBounds()
            }, 200)
        )
        map.addListener("zoom_changed", () => {
            message.value = map.getZoom()
            gmapStore.zoom = `zoom: ${map.getZoom()}`
        })
        map.addListener("click", (ev) => {
            message.value = `${ev.latLng.lat()}:${ev.latLng.lng()}`
        })
    }
)

watch(
    ()=>store.polylinePoints,
    (polylinePoints)=>{
        
        console.log(poly.value.polyline?.setPath(polylinePoints))
    }
)

const markerOption = (pt) => {
    return {
        position: pt,
        opacity: pt.opacity,
        icon: circle
    }
}

const markerClick = (id) => {
    const ptIndex = store.getPointById(id)
    store.points[ptIndex].opacity = 0.5
    console.log("marker index:%d, id:%d clicked", ptIndex, id)
}
</script>

<template>
    <GoogleMap ref="gmap" :api-key="apiKey" style="width: 100%; height: 100%" :center="center" :zoom="15"
        v-slot="slotProps">
        <Polyline v-if="polyReady" ref="poly" :options="polylineOption" />
        <Marker :options="markerOption(pt)" v-for="(pt, index) in store.availablePoints" :key="pt.id"
            @mouseover="markerClick(pt.id)" />
        
    </GoogleMap>
    <div style="position: fixed;
            left: 100px;
            bottom: 100px;
            width: 300px;
            height: 80px;
            background-color: white;
            z-index: 1000;
        ">
        {{ message }}
    </div>

    <!-- <custom-modal v-model="show" @confirm="confirm" @cancel="cancel">
      <template v-slot:title>Hello, vue-final-modal</template>
      <p>Vue Final Modal is a renderless, stackable, detachable and lightweight modal component.</p>
    </custom-modal> -->
</template>
