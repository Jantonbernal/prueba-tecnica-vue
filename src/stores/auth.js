import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { defineStore, storeToRefs } from "pinia";
import { useAccessStore } from "@/stores/access.js";
import useAuth from "@/composables/services/auth";

export const useAuthStore = defineStore('auth', () => {
    // variables del composable
    const {
        dataLogin, login, errorLogin,
        dataLogout, logout, errorLogout,
    } = useAuth();

    // Router inicializado
    const useAccess = useAccessStore();
    const { permissions } = storeToRefs(useAccess);

    // variables
    const accessToken = ref(null);

    // verifica si existe el token para guardarlo en el accessToken
    if (localStorage.getItem('token')) {
        accessToken.value = JSON.parse(localStorage.getItem('token'))
    }

    // Metodo para iniciar sesión
    const signIn = (credentials) => {
        login({
            username: credentials.username,
            password: credentials.password,
        })
    }

    // Está atento a cambios para setear el token
    watch(dataLogin, (received) => {
        console.log(received);
    })

    // Está atento a cambios para setear el token
    watch(errorLogin, (received) => {
        console.log(received);
    })

    // Metodo para cerrar sesión
    const signOut = () => {
        logout()
    }

    return {
        signIn,
        dataLogin,
        errorLogin,
        signOut,
        dataLogout,
        errorLogout,
    }
})