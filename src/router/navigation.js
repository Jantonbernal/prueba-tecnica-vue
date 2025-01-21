import { storeToRefs } from "pinia";
import router from '@/router/index';
import { useAccessStore } from "@/stores/access";
import { ref } from "vue";

router.beforeResolve((to, from, next) => {
    // Store de accesos
    const useAccess = useAccessStore();
    const { accessToken } = storeToRefs(useAccess);

    const verifyAccess = ref(JSON.parse(localStorage.getItem("accessToken")) || accessToken.value);

    // Condición para evitar acceso al login si ya está autenticado
    if (to.name === "Login" && !to.meta.requiresAuth && verifyAccess.value) {
        // Redirigir a la página principal u otra ruta protegida
        next({ name: "Home" }); // Cambia "Home" por la ruta protegida deseada
    } else if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Si la ruta requiere autenticación
        if (verifyAccess.value) {
            next(); // Permitir navegación
        } else {
            // Redirigir a la ventana de login si no está autenticado
            next({ name: "Login" });
        }
    } else {
        // Permitir navegación si la ruta no requiere autenticación
        next();
    }
});
