<script setup>
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/counter";
import { storeToRefs, createPinia } from "pinia";
const pini = createPinia();
const store = useUserStore();
const { thecounter } = storeToRefs(store);
const therouter = useRouter();
const customConfig = {
    Authorization: "Bearer " + store.token,
};

function logout() {
    console.log(customConfig);
    axios({
        url: "http://localhost:8000/api/logout",
        method: "get",
        headers: customConfig,
    })
        .then((response) => {
            console.log(response.data);
            if (response.data.success === true) {
                store.reset();
                therouter.push("/");
            }
        })
        .catch((error) => {
            console.log("AJAX" + error);
        })
        .finally();
}
</script>

<template>
    <nav class="p-4 bg-blue-600 shadow-md">
        <div class="flex items-center justify-between">
            <div class="text-xl font-semibold text-white">
                <router-link to="/">Library</router-link>
            </div>
            <div class="text-xl font-semibold text-white">
                <router-link to="/pegawai">Pegawai</router-link>
            </div>
            <div class="text-xl font-semibold text-white">
                <router-link to="/barang">Barang</router-link>
            </div>
            <!-- Navigation Items -->
            <div class="flex items-center space-x-6">
                <div class="text-white">
                    <span class="mr-4">Counter: {{ thecounter }}</span>
                </div>

                <!-- Logout Button -->
                <button
                    @click="logout"
                    class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5"
                >
                    Logout
                </button>
            </div>
        </div>
    </nav>
</template>
