<script setup>
</script>
<template>
    <v-main class="my-3 scrollable-content">
        <v-container fluid>
            <!-- Navigation -->
            <router-view v-slot="{ Component }">
                <transition :name="'fade'" mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
        </v-container>
    </v-main>
</template>