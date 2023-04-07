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

                <div>
                    <template v-if="!isAuthenticated">
                        <v-btn @click="loginDialog = true"> Login </v-btn>
                        <v-btn>Register</v-btn> </template
                    ><template v-else>
                        <v-btn @click="logout">Logout</v-btn>
                    </template>
                </div>
            </v-container>
        </v-app-bar>

        <v-main class="bg-grey-lighten-3">
            <v-responsive height="100%">
                <slot />
            </v-responsive>
        </v-main>
        
        <v-dialog v-model="loginDialog" width="auto">
            <v-card>
                <v-card-title>ログイン</v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="credentials.email"
                        label="メールアドレス"
                        type="text"
                    ></v-text-field>
                    <v-text-field
                        v-model="credentials.password"
                        label="パスワード"
                        :type="showPassword ? 'text' : 'password'"
                        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append="showPassword = !showPassword"
                    ></v-text-field>
                    <v-btn variant="outlined" @click="loginSubmit"
                        >ログイン</v-btn
                    >
                    <v-btn variant="outlined">キャンセル</v-btn>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Link, router } from "@inertiajs/vue3";
import axios from "axios";

console.log(import.meta.env.VITE_GOOGLE_MAPS_KEY);

const props = defineProps(["auth", "isAuthenticated"]);

const links = ref(["Dashboard", "Messages", "Profile", "Updates", "Help"]);

const loginDialog = ref(false);
const credentials = ref({
    email: "",
    password: "",
});
const showPassword = ref(false);

const loginSubmit = () => {
    console.log("submit");
    axios.get("/sanctum/csrf-cookie").then((response) => {
        console.log(credentials);
        axios
            .post("/login", credentials.value)
            .then((response) => router.reload())
            .catch((e) => router.reload());
    });
};

const logout = () => {
    axios.post("logout").then((response) => router.reload());
};

onMounted(() => {
    // 知らないうちにログアウトしてはいないかをチェックする
    // そもそもログインしていなければチェックに行かない
    setInterval(() => {
        if (isAuthenticated) {
            axios
                .post("/check")
                .then((res) => {
                    if (!res.data.loggedin) {
                        router.reload();
                    } else {
                        console.log("loggedin");
                    }
                })
                .catch((e) => {
                    console.log("loggedout");
                    router.reload();
                });
        }
    }, 60_000);
});
</script>
