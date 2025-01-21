<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app id="app" class="app">
    <!-- Navigation -->
    <router-view v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<style>
html,
body {
  margin: 0;
  padding: 0;
  min-height: 100%;
  height: auto;
}

.app {
  position: relative;
  width: 100vw;
  height: 100vh;
}
</style>
