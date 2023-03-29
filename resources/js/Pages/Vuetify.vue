<script lang="ts">
import Layout from '@/Layouts/MainLayout.vue'

export default {
    layout: Layout
}
</script>

<script setup lang="ts">
import { ref } from "vue"
import { Head } from "@inertiajs/vue3"

const props = defineProps(['canLogin','canRegister','laravelVersion','phpVersion', 'auth'])

const drawer = ref(null)
</script>

<template>
    <Head title="Vuetify Test" />

    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3><h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h1>THIS IS BRMTOOL3</h1>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h2>THIS IS BRMTOOL3</h2>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3>
    <h3>THIS IS BRMTOOL3</h3><h3>THIS IS BRMTOOL3</h3><h3>THIS IS BRMTOOL3</h3><h3>THIS IS BRMTOOL3</h3><h3>THIS IS BRMTOOL3</h3><h3>THIS IS BRMTOOL3</h3>
</template>

