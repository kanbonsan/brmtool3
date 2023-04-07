<script>
import Layout from "@/Layouts/MainLayout.vue";

export default {
    layout: Layout,
};
</script>

<script setup>
import { ref, watch } from "vue";
import { Head } from "@inertiajs/vue3";
import { GoogleMap, Marker } from "vue3-google-map";

const props = defineProps(["canLogin", "canRegister"]);

const apiKey = ref(import.meta.env.VITE_GOOGLE_MAPS_KEY);
const center = ref({ lat: 40.689247, lng: -74.044502 });

const gmap = ref(null)

watch(()=> gmap.value?.ready, (ready)=>{
    if(!ready) {
        console.log('not ready')
        return
    }
    console.log('gmap ready')
})

</script>

<template>
    <GoogleMap
        ref="gmap"
        :api-key="apiKey"
        style="width: 100%; height: 100%"
        :center="center"
        :zoom="15"
    >
        <Marker :options="{ position: center }" />
    </GoogleMap>
</template>
