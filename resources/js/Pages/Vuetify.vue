<script>
import Layout from "@/Layouts/MainLayout.vue"
import { compileScript } from "@vue/compiler-sfc"

export default {
    layout: Layout,
}
</script>

<script setup>
import { ref, watch } from "vue";
import { Head } from "@inertiajs/vue3";
import { GoogleMap, Marker } from "vue3-google-map";
import brm from "../../sample/sample1000.brm.json"

import {useBrmRouteStore} from '@/stores/BrmRouteStore'


const props = defineProps(["canLogin", "canRegister"])

const apiKey = ref(import.meta.env.VITE_GOOGLE_MAPS_KEY)
const center = ref({ lat: 40.689247, lng: -74.044502 })

const store = useBrmRouteStore()

const gmap = ref(null)

store.$subscribe((mutation,state)=>{
    console.log('changed',mutation.type)
})

watch(() => gmap.value?.ready, (ready) => {
    if (!ready) {
        return
    }
    console.log(store.lastId)
    store.setPoints(brm.encodedPathAlt)
})

</script>

<template>
    <GoogleMap ref="gmap" :api-key="apiKey" style="width: 100%; height: 100%" :center="center" :zoom="15" v-slot="slotProps">
        <Marker :options="{ position: center }" />
    </GoogleMap>
</template>

