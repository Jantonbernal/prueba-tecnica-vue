import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL_API;
axios.defaults.headers.common['Accept'] = 'application/json, text/plain, */*';
axios.defaults.headers.common['Accept-Language'] = 'es-ES,es;q=0.8,en-US;q=0.5,en;q=0.3';
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Al obtener una respuesta de las peticiones el interceptor se activa
axios.interceptors.response.use(
    function (successRes) {
        // Si la respuesta es exitosa, simplemente devolverla.
        return successRes;
    },
    function (error) {
        // Obtener el código de estado de la respuesta (si existe)
        const status = error.response ? error.response.status : null;

        // Verificar si el error es 401 (No autorizado)
        if (status === 401) {
            // Cerrar sesión del usuario si el token de JWT ha caducado
            logoutUser();
        }

        // Rechazar el error para que pueda ser capturado más adelante
        return Promise.reject(error);
    }
);

/**
 * Función para cerrar la sesión del usuario cuando el token JWT caduca.
 */
function logoutUser() {
    // Eliminar los datos del token y la información de autenticación del localStorage
    localStorage.removeItem('access')
    localStorage.removeItem('token')
    localStorage.removeItem('menu')

    // Si el usuario está en una ruta diferente de 'Login', redirigirlo y mostrar mensaje
    if (Router.currentRoute.value.name !== 'Login') {
        $toast.error('Tu sesión ha caducado. Por favor, inicia sesión nuevamente.');

        // Redirigir al usuario a la página de inicio (Login)
        Router.push({ name: 'Login' });
    } else {
        // Si ya está en 'Login', no es necesario redirigir de nuevo. Solo mostrar el mensaje
        $toast.error('Tu sesión ha caducado. Por favor, inicia sesión.');
    }
}