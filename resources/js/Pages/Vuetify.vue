<script lang="ts">
import Layout from "@/Layouts/MainLayout.vue"

export default {
    layout: Layout,
}
</script>

<script setup lang="ts">
import { ref } from "vue"
import { Head } from "@inertiajs/vue3"

const props = defineProps([
    "canLogin",
    "canRegister",
    "laravelVersion",
    "phpVersion",
    "auth",
    "isAuthenticated",
])
</script>

<template>
    <div>
        <h1>HELLO VUE</h1>
    </div>
    
</template>

