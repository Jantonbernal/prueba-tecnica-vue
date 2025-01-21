import { ref } from "vue";
import axios from "axios";

export const useHttpRequest = () => {
    // Definición de estado reactivo
    const dataEndPoint = ref(null); // Almacena la respuesta de la solicitud HTTP
    const errorEndPoint = ref(null); // Almacena los errores si ocurre algún problema durante la solicitud
    const loading = ref(false); //  Indica si la solicitud está en curso (true) o si ya ha finalizado (false)

    const sendRequest = async (method, url, data = null, headers = {}) => {
        try {
            loading.value = true;

            // Configuración dinámica para Axios
            const config = {
                method,
                url,
                headers,
            };

            // Asignar `data` o `params` según el método HTTP
            if (method === "GET") {
                config.params = data;
            } else {
                config.data = data;
            }

            // Realizar la solicitud
            const response = await axios(config);

            dataEndPoint.value = response.data;
            errorEndPoint.value = null
        } catch (e) {
            errorEndPoint.value = e.response || e;
        } finally {
            loading.value = false;
        }
    }

    return {
        sendRequest,
        dataEndPoint,
        loading,
        errorEndPoint
    }
}