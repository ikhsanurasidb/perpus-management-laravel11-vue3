<template>
    <nav class="flex justify-center gap-4">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
    </nav>
    <main>
        <router-view></router-view>
    </main>
</template>
