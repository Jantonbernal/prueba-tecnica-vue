<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";

import { useMenuStore } from "@/stores/menu.js";
import { useHeightStore } from "@/stores/height.js";
import Profile from "@/components/Dashboard/Profile.vue";

const router = useRouter();

// Store de menús
const useMenu = useMenuStore();
const { changeDrawer } = useMenu;
const { drawer, menus } = storeToRefs(useMenu);

// Store de altura
const useHeight = useHeightStore();
const { height } = storeToRefs(useHeight);

// Método para manejar el clic en un menú
const navigateTo = (path) => {
    if (router.hasRoute(path)) {
        selectedMenu.value = path;
        router.push({
            name: path,
        });
    } else {
        $toast.open({
            message: "Ruta no encontrada",
            type: 'error',
        });
    }
}
</script>

<template>
    <div class="app-container">
        <!-- Icono del menú para pantallas pequeñas -->
        <v-app-bar-nav-icon v-if="height < 500" @click="changeDrawer(!drawer)" class="ml-10">
        </v-app-bar-nav-icon>

        <!-- Barra de herramientas -->
        <v-app-bar v-else elevation="0" height="140" app>
            <v-container class="d-flex justify-space-around align-center flex-row">
                <!-- Sección izquierda -->
                <div class="text-center mr-4">
                    <v-btn v-if="menus.length > 0" v-for="(item, index) in menus" :key="index" color="primary"
                        @click="navigateTo(item.route)" prepend-icon="mdi-open-in-new" size="small">
                        <span>{{ item.nombre }}</span>
                    </v-btn>
                </div>

                <v-spacer class="flex-grow-1"></v-spacer>

                <!-- Sección derecha -->
                <div class="d-flex flex-row justify-center align-center mr-5" v-if="height >= 500"
                    :class="height >= 500 ? '' : 'mt-4'">
                    <Profile />
                </div>
            </v-container>
        </v-app-bar>
    </div>
</template>

<style scoped>
/* Contenedor principal */
.app-container {
    display: flex;
    flex-direction: column;
}

/* Barra superior */
.app-bar {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start;
}

/* Estilos para la información del usuario */
.user-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 16px;
}

/* Nombre del usuario */
.user-name {
    font-weight: bold;
    text-align: center;
    margin-bottom: 8px;
}

/* Botón de cerrar sesión */
.logout-button {
    width: 100%;
}
</style>
