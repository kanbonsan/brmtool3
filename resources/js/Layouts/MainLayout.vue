<template>
    <v-app id="tool">
        <v-app-bar class="elevation-3" color="primary" density="comfortable">
            <v-container class="fill-height d-flex align-center" :fluid="true">
                <v-avatar
                    class="me-10 ms-4"
                    color="grey-darken-1"
                    size="32"
                ></v-avatar>

                <v-btn v-for="link in links" :key="link" variant="text">
                    {{ link }}
                </v-btn>

                <v-spacer></v-spacer>

                <v-responsive max-width="260"><Link href='/login'> Login </Link></v-responsive>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-container>
                <v-row>
                    <v-col cols="2">
                        <v-sheet rounded="lg">
                            <v-list rounded="lg">
                                <v-list-item v-for="n in 5" :key="n" link>
                                    <v-list-item-title>
                                        List Item {{ n }}
                                    </v-list-item-title>
                                </v-list-item>

                                <v-divider class="my-2"></v-divider>

                                <v-list-item link color="grey-lighten-4">
                                    <v-list-item-title>
                                        Refresh
                                    </v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-sheet>
                    </v-col>

                    <v-col>
                        <slot />
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
  
<script setup>
import { ref, onMounted } from "vue"
import { Link } from '@inertiajs/vue3';

const props = defineProps(['auth'])
const ifAuthenticated = ref(false)

const links = ref(["Dashboard", "Messages", "Profile", "Updates", "Help"])
onMounted(()=>{
    console.log(props.auth.user.name)
    if(props.auth.user.name!==undefined){
        ifAuthenticated = true
    } else {
        ifAuthenticated = false
    }
})


</script>