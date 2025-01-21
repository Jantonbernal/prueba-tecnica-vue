
import { storeToRefs } from "pinia";
import router from '@/router/index'
import { useAccessStore } from "@/stores/access";
import { ref } from "vue";

router.beforeResolve((to, from, next) => {
    // Store de accesos
    const useAccess = useAccessStore();
    const { accessToken } = storeToRefs(useAccess);

    const verifyAccess = ref(JSON.parse(localStorage.getItem("accessToken")) || accessToken.value);

    // Si hacia la ruta que voy requiere autenticación
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Verifico si está autenticado
        if (verifyAccess.value) {
            next();
        } else {
            // sino esta autenticado que lo envíe a la ventana de login
            next({
                name: "Login",
            });
        }
    } else {
        next();
    }
});