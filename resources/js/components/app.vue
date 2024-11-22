<script setup>
import { ref, computed } from "vue";
import FooterView from "./FooterView.vue";
import MenuView from "./MenuView.vue";
import { useRoute } from "vue-router";
import { useColorMode } from "@vueuse/core";

useColorMode("dark");

const theroute = useRoute();
const isnotlogin = computed(() => {
    return theroute.name != "login" ? true : false;
});
</script>
<template>
    <div>
        <MenuView v-if="isnotlogin" />
        <div class="w-full h-full">
            <router-view></router-view>
        </div>
        <FooterView v-if="isnotlogin" />
    </div>
</template>
