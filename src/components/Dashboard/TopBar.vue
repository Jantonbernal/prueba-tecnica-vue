<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { useMenuStore } from "@/stores/menu.js";
import { useHeightStore } from "@/stores/height.js";
import { useAccessStore } from "@/stores/access.js";

// Inicializar toast para notificaciones
const $toast = useToast();

const router = useRouter();

// Store de menús
const useMenu = useMenuStore();
const { changeDrawer } = useMenu;
const { drawer, menus } = storeToRefs(useMenu);

// Store de altura
const useHeight = useHeightStore();
const { height } = storeToRefs(useHeight);

// Store de accesos
const useAccess = useAccessStore();
const { access } = storeToRefs(useAccess);

onMounted(() => {
    authUserAuthenticate.value = JSON.parse(access?.value);
});

const authUserAuthenticate = ref(null);

// Método para manejar el clic en un menú
const navigateTo = (route) => {
    router.push({ name: route });
};

const logout = () => {
    access.value = null
    $toast.open({
        message: "Cerro sesión correctamente",
        type: 'success',
    });
    router.push({ name: 'Login' })
}

</script>

<template>
    <div class="app-container">
        <!-- Icono del menú para pantallas pequeñas -->
        <v-app-bar-nav-icon v-if="height < 500" @click="changeDrawer(!drawer)" class="ml-10">
        </v-app-bar-nav-icon>

        <!-- Barra de herramientas -->
        <v-app-bar v-else :elevation="15" rounded="lg" height="160" class="app-bar">
            <!-- Sección superior con usuario y botón de cerrar sesión -->
            <div class="user-info">
                <h3 class="user-name">{{ authUserAuthenticate?.data?.email }}</h3>
                <v-btn color="error" class="logout-button" @click.prevent="logout">Cerrar Sesión</v-btn>
            </div>

            <!-- Navegación inferior -->
            <v-bottom-navigation v-if="menus.length > 0" grow height="auto">
                <v-btn v-for="(item, index) in menus" :key="index" value="item.nombre" @click="navigateTo(item.route)">
                    <v-icon>{{ item.icon || "mdi-dots-horizontal" }}</v-icon>
                    <span>{{ item.nombre }}</span>
                </v-btn>
            </v-bottom-navigation>
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
