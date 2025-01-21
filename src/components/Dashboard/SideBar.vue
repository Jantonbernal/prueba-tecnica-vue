<script setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

import { useMenuStore } from "@/stores/menu.js";
import { useAccessStore } from "@/stores/access.js";
import { useHeightStore } from "@/stores/height.js";

import useAuth from "@/composables/services/auth";

// Inicializar toast para notificaciones
const $toast = useToast();
// Inicializar router
const router = useRouter();

// Stores inicilizados
// Store de menus
const useMenu = useMenuStore();
const { drawer, menus } = storeToRefs(useMenu);
// Store de accesos
const useAccess = useAccessStore();
const { access } = storeToRefs(useAccess);
// Store height
const useHeight = useHeightStore();
const { height } = storeToRefs(useHeight);

const {
    dataLogout, logout, loadingLogout, errorLogout,
} = useAuth();

onMounted(() => {
    authUserAuthenticate.value = JSON.parse(access?.value);
})

const authUserAuthenticate = ref(null)

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

watch(dataLogout, (received) => {
    access.value = null

    $toast.open({
        message: JSON.parse(access.value).message,
        type: 'success',
    });

    router.push({ name: 'Login' })
})
</script>
<template>
    <v-navigation-drawer v-if="height < 500" v-model="drawer" rounded="lg" floating app :elevation="15" width="290"
        class="sidebar mx-5 my-5 mb-n10 pa-5">

        <div class="mb-5 cursor-pointer">
            <h3 class="text-center mb-3">
                {{ authUserAuthenticate?.data?.email }}
            </h3>
            <v-btn block color="error">
                Cerrar Sesión
            </v-btn>
        </div>

        <v-list v-for="(item, index) in menus" :key="index" v-show="menus.length > 0" class="cursor-pointer pt-0">
            <v-list-group expand-icon>
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="item.nombre" density="compact" rounded="lg"></v-list-item>
                </template>
            </v-list-group>
        </v-list>
    </v-navigation-drawer>
</template>