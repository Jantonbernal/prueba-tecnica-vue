<script setup>
import SideBar from './SideBar.vue';
import TopBar from './TopBar.vue';
import Main from './Main.vue';

</script>

<template>
    <v-app>
        <SideBar />
        <TopBar />
        <Main />
    </v-app>
</template>

<style>
html,
body {
    height: 100%;
    margin: 0;
    overflow: hidden;
    /* Oculta el desplazamiento global */
}

#app {
    display: flex;
    height: 100%;
}

.scrollable-content {
    height: 96vh;
    overflow-y: auto;
}
</style>