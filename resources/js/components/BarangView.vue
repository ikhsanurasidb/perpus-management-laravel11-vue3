<script setup>
import { useUserStore } from "../stores/counter";
import { Button } from "@/components/ui/button";

const store = useUserStore();

function increase() {
    store.thecounter++;
}
</script>

<template>
    <main class="flex justify-center">
        <Button type="button" @click="increase()">
            COUNTER IN Barang {{ store.thecounter }}
        </Button>
    </main>
</template>
