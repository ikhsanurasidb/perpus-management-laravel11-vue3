<script setup>
import { computed } from "vue";
import FooterView from "./FooterView.vue";
import MenuView from "./MenuView.vue";
import { useRoute } from "vue-router";
import { useColorMode } from "@vueuse/core";

useColorMode("dark");

const theroute = useRoute();
const isnotlogin = computed(() => {
    return theroute.name != "login" ? true : false;
});

const isnotregister = computed(() => {
    return theroute.name != "register" ? true : false;
});

const isnotmenu = computed(() => {
    return theroute.name != "menu" ? true : false;
});

</script>
<template>
    <div class="flex flex-col min-h-[91vh]" :class="{'mt-20' : isnotlogin && isnotregister}">
        <MenuView v-if="isnotlogin && isnotregister && isnotmenu" />

        <div class="flex-1 px-4" :class="{'lg:ml-72' : isnotlogin && isnotregister}">
            <router-view></router-view>
        </div>
        <FooterView class="mt-16 lg:ml-72" v-if="isnotlogin && isnotregister" />
    </div>
</template>
