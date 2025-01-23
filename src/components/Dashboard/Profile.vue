<script setup>
import { ref } from 'vue';
import { watch } from 'vue';
import { onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import { useAccessStore } from "@/stores/access.js";
import useAuth from "@/composables/services/auth";

// Inicializar toast para notificaciones
const $toast = useToast();

const {
    dataLogout, logout, loadingLogout, errorLogout,
} = useAuth();

// Store de accesos
const useAccess = useAccessStore();
const { access } = storeToRefs(useAccess);

onMounted(() => {
    authUserAuthenticate.value = JSON.parse(access?.value);
});

const authUserAuthenticate = ref(null);

const signOut = () => {
    logout()
}

watch(dataLogout, (received) => {
    access.value = null
    $toast.open({
        message: "Cerro sesión correctamente",
        type: 'success',
    });

    router.push({ name: 'Login' })
})

watch(errorLogout, (received) => {
    if (received) {
        $toast.open({
            message: "Cerro sesión correctamente",
            type: 'error',
        });
        access.value = null
    }
})

</script>

<template>
    <v-overlay :model-value="loadingLogout" :opacity="0.1" class="align-center justify-center">
        <v-progress-circular color="primary" size="64" indeterminate></v-progress-circular>
    </v-overlay>

    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn variant="text" v-bind="props" icon>
                <v-avatar size="35">
                    <v-icon icon="mdi mdi-account-tie"></v-icon>
                </v-avatar>
            </v-btn>
        </template>

        <v-sheet :elevation="3" :max-height="300" :max-width="250" :rounded="'xl'" class="cursor-pointer mt-2">
            <v-list>
                <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
                    :subtitle="authUserAuthenticate?.data?.nombre" :title="authUserAuthenticate?.data?.email">
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <div class="pt-4 pb-4 px-5 text-center">
                <v-btn @click="signOut" color="primary" class="rounded-pill" :loading="loadingLogout" block>
                    SALIR
                    <template v-slot:loader>
                        <v-progress-linear indeterminate></v-progress-linear>
                    </template>
                </v-btn>
            </div>
        </v-sheet>
    </v-menu>
</template>